


import { initiliazeGeminiAI } from "./functions/geminiInitializer";
import { IinterviewData } from "./interfaces/interviewData";


//*** Prompts  */
import { INTERVIEW_COMPLETE_CHECKER } from "./prompts/AI_Interviewer_Prompts";
import { generatePromptForInterviewerResponse } from "./functions/generatePromptForInterviewerResponse";
import { INTERVIEW_RESULT_GENERATOR } from "./prompts/InterviewTranscriptAnalyser";


export class AI_Interviewer 
{
    public gemini 

    constructor()
    {
        this.gemini = initiliazeGeminiAI() 
    }


    /** Running Prompts  */


        // Runs a prompt with the gemini AI model and returns a string 
        async runPromptWithGemini( prompt: string )
        {
            const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash"});
            const result = await model.generateContent([prompt]);
            const textResult: string =  result.response.text()
            return textResult
        }


    /***  Interview Messages  */

        // Adds A message From the Interviewer or Candidate To the Interview Transcript
        appendMessageToInterviewTranscript( interviewTranscript: string, message: string)
        {
            return interviewTranscript + '\n' + message
        }


    /*** Candidate  */

        // Response 
        prependStringToCandidateResponse( stringToPrepend: string, candidateResponse: string )
        {
            return stringToPrepend + ' ' + candidateResponse 
        }


    /*** Interviewer Responses  */

        // Generate Interviewer Response 
        async generateInterviewerNextResponse( interviewData: IinterviewData, interviewTranscript: string)
        {
            const interviewerResponsePrompt = generatePromptForInterviewerResponse( interviewData, interviewTranscript )  
            const nextResponse = await this.runPromptWithGemini( interviewerResponsePrompt )   
            return nextResponse 
        }


    /** Interview LifeCycle  */             

        // Utilizes AI to Check If An Interview Has Been Completed 
        async checkInterviewCompleted( interviewTranscript: string ): Promise<boolean> 
        {
        try 
        {
                // Interview Checker Role Prompt to Interview Transcript 
                var prompt = INTERVIEW_COMPLETE_CHECKER + '\n' + interviewTranscript

                // Check Completed 
                var interviewCompleted: string = await this.runPromptWithGemini(prompt)  /** INFO: returns a string: "true" or "false" */

                // Result 
                var finalResult: any = undefined 

                interviewCompleted = interviewCompleted.trim() 

                if( interviewCompleted === 'true' ){ finalResult = true }
                if( interviewCompleted === 'false' ){ finalResult = false }

                return finalResult
        }
        catch(e: any)
        {
                console.log(`INTERVIEWER_ERROR: COULD NOT CHECK INTERVIEW COMPLETE  ${ e } `)
                process.exit(1) 
        }
        }


        async generateInterviewResults( interviewTranscript: string  )
        {
            const prompt =  INTERVIEW_RESULT_GENERATOR + '\n' + interviewTranscript 
            const interviewResult = await this.runPromptWithGemini( prompt )   
            return interviewResult 
        }

        

}