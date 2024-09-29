
import { Server } from "socket.io"
import logger from "./system/logger/logger";
import http from "http"
import { AI_Interviewer } from "./apps/AI_Interviewer/AI_Interviewer";
import { IinterviewData } from "./apps/AI_Interviewer/interfaces/interviewData";
import { IinterviewSessionData } from "./apps/AI_Interviewer/interfaces/interviewSessionData";
import { initializeRedis } from "./middleware/cache/redisCache";
import { fetchUserResumeAsText } from "./util/jobDescription/fetchUserResume";
import { extractCompanyNameFromJobDescription } from "./util/jobDescription/generateJobDescriptionFromResume";



export async function initializeWebsocketsServer( server: http.Server )
{
    try 
    {


        logger.info('Initializing Socket.io Server') 

        const res = await initializeRedis() 
        
        if( !res?.RedisClient || !res.setCache )
        {
            return 
        }
        
        const { RedisClient, setCache } = res 

        /** Initialized Interviewer */
        const Interviewer = new AI_Interviewer() 

    
        /** Initialized Socket.io Server  */
        const io: Server = new Server(server, {
            cors: {
                origin: "*", 
                methods: ["GET", "POST"]
            }
        })


        
        /** Setup Authentication Middleware  */
        io.use((socket, next) => {

            const { candidateFirstname, roleName, experienceLevel, jobDescription, resumeUrl } = socket.handshake.query       

            if ( !candidateFirstname || !roleName || !experienceLevel || !jobDescription || !resumeUrl ) {

                // Identify Missing Fields 
                socket.emit('INCOMPLETE_INTERVIEW_DATA', socket.handshake.query ) 
            }

            // Store user details in socket instance
            socket.data = { candidateFirstname, roleName, experienceLevel, jobDescription, resumeUrl};
            next();
        })
        

        
        // Socket Server Event Listeners 
        io.on('connection',async (socket )=>{

            logger.info("Client Connected To Socket Server " + socket.id ) 

            let data = socket.data
            
            // Fetch Candidate Resume As Text 
            const userResume = await fetchUserResumeAsText(data.resumeUrl) 

            // Extract Company Name From Job Description 
            const companyName = await extractCompanyNameFromJobDescription( data.jobDescription)


            const { candidateFirstname, roleName, experienceLevel, jobDescription }  = data 


            let interviewData: IinterviewData = { candidateFirstname, roleName, experienceLevel, jobDescription, companyName, candidateResume: userResume }
            /** Initialize Interview Session  */

            // Set New Interview Session For Candidate 
            const interviewSessionData: IinterviewSessionData =
             {
                interviewComplete: false,  
                interviewTranscript: `Interviewer: Welcome to the Interview ${ candidateFirstname }`, // Initialize First Message In Interview Transcript 
                interviewData 
             }

            // Save Session To Memory 
            setCache(socket.id, interviewSessionData )

            // Send Welcome Message To Client 
            var serverResponse = { msg: `Welcome to the interview ${ candidateFirstname }`, metaData:{ interviewComplete: false, audioUrl:'audioUrl' }}
            socket.emit('INTERVIEWER_RESPONSE', serverResponse ) 



            socket.on('message',async (message)=>{

                // Get Candidates Interview Session From Memory 
                var interviewSessionData = await RedisClient.get(socket.id) 

                // Ensure Interview Session Exists 
                if( !interviewSessionData )
                {
                    socket.emit('SERVER_ERROR','COULD_NOT_FIND_INTERVIEW_DATA_IN_MEMORY') 
                    return 
                }

                // Parse Interview Session Data To Json 
                var parsedInterviewSessionData: IinterviewSessionData = JSON.parse( interviewSessionData ) 
                
                // Append Prefix "Candidate" to Candidates  Response  
                var candidateMessage = '\nCandidate: ' + message

                // Append variable "candidateMessage"  to Interview Transcript 
                parsedInterviewSessionData['interviewTranscript'] = parsedInterviewSessionData['interviewTranscript'] + candidateMessage

                // Pass Interview Transcript to Interviewer and Check If Interview Completed 
                const interviewCompleted = await Interviewer.checkInterviewCompleted( parsedInterviewSessionData['interviewTranscript'])

                // Check Interview Completed Status 
                if( interviewCompleted )
                {
                    const interviewerResponse = { msg:'Interview Ended', metaData:{ interviewComplete: true, audioUrl:""  }}
                    // Create Results 
                    // Delete Interview Details From Memory 
                    socket.emit('INTERVIEW_COMPLETED', interviewerResponse)
                }
                else 
                {
                    // Extract Current Interview Transcript And Interview Data 
                    const { interviewData, interviewTranscript } = parsedInterviewSessionData

                    // Generate Interviewer Response Based on Interview Transcript 
                    var generatedInterviewerResponse = await Interviewer.generateInterviewerNextResponse(interviewData, interviewTranscript )

                    // Save Interviewer Response to Candidate Session Data 
                    parsedInterviewSessionData['interviewTranscript'] = parsedInterviewSessionData['interviewTranscript'] + '\n' + generatedInterviewerResponse 

                    // Update Candidate Session Data in Memory 
                    setCache( socket.id, parsedInterviewSessionData ) 

                    const interviewerResponse = { msg: generatedInterviewerResponse, metaData:{ interviewComplete: false, audioUrl: 'audioUrl'}}
                    socket.emit('INTERVIEWER_RESPONSE', interviewerResponse )
                }
            })


            socket.on('disconnect',()=>{
                logger.info("Client disconnected from socket server") 
                // Save User Interview Details to DB 
            })

        })



        logger.info('SOCKET.io Server Initialized') 

    }
    catch(e: any)
    {
        logger.error(e,"Could Not Initialize Web Socket Server") 
    }

}