

import { UserRepository } from "@src/repos/user/user.repo";
import { UserDTO } from "@src/DTOs/user/user";
import { sendMail } from "@src/util/mail/sendMain";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import  logger from "@src/system/logger/logger";
import { config } from "dotenv"
import { UnauthorizedError } from "@src/util/Errors/Endpoints/unauthorizedError";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { generateJwtToken } from "@src/util/Auth/tokens";
import { LearningArea } from "@src/models/area";
import { groupLearningAreasByStage } from "@src/util/learningModule/organizeLearningModules";
import { ILearningModuleOverview } from "@src/models/learningProfile";
import { ForbiddenError } from "@src/util/Errors/Endpoints/forbiddenError";
import { IUser } from "@src/models/User";
config() 


export class UserService 
{
    
    constructor( private userRepository: UserRepository)
    {
        
    }


    async create( user:  UserDTO, domain: string  ): Promise< void >
    {
       try 
       {
           
            const newUser: { _id: string } = await this.userRepository.create( user ) 

            // Email Verification Link 
            const verificationLink = `${domain}/api/v1/users/verify?token=${ newUser._id}`

            // User Email 
            const { email } = user 

            const htmlBody = `<!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="UTF-8">
                                    <title>Email Verification</title>
                                </head>
                                <body>
                                    <p>Welcome to Interview AI!</p>
                                    <p>Please click the link below to verify your email address:</p>
                                    <p><a href="${ verificationLink }" style="color: #1a0dab; text-decoration: underline;" target="_blank">Verify Email</a></p>
                                    <p>If you did not request this verification, please ignore this email.</p>
                                </body>
                                </html>
                                `

            const mailOptions = 
            {
                email, 
                subject: 'Welcome To Interview AI',
                text: 'Welcome to InterviewAI. Please visit here to verify',
                html:  htmlBody 
            }
            
            await sendMail( mailOptions ) 

       }
       catch(e)
       {
            logger.error(e,`User_Service: Error occured while creating New User `)
            throw new ServerError( e.message ) 
       }
    }


    async findByEmail( email: string ): Promise< IUser | null > 
    {
       try 
       {
            logger.info(`User_Service: Finding User By Email ${ email }`)
            return await this.userRepository.findByEmail( email ) 
       }
       catch(e: any)
       {
            logger.error(e,`User_Service: Error Occured While Finding User By Email: ${ email }`)
            throw e 
       }
    }


    async update( userId: string, updateBody: Partial< Pick< IUser, 'firstname' | 'lastname' | 'email' > > ): Promise<void> 
    {
        try 
        {
            const updateResult = await this.userRepository.update( userId, updateBody ) 

            if( !updateResult ){ throw new ServerError("Server Could Not Update User: " + userId ) }
        }
        catch(e: any )
        {
            logger.error(e,`USER_SERVICE_ERROR: Error Occured while Saving Updating User: ${ userId }  `)
            throw e
        }
    }

    async verifyUser( userID: string )
    {
        try 
        {
            const user = await this.userRepository.findById( userID ) 

            if( !user )
            {
                logger.error(`Could not find user with ID: ${ userID } from Validation `)
                return new UnauthorizedError("Invalid Validation Link")
            }

            // Update User 
            user.isVerified = true 
            user.markModified("isVerfied")
            await user.save() 
            
            return 
        }
        catch(e)
        {
            if( e instanceof UnauthorizedError )
            {
                throw e 
            }

            logger.error(e,'SERVICE: Error Occured while finding user by Id ') 
            throw new ServerError("Error Occured While Finding User By Id ") 
        }
    }

    async signin( email: string, password: string  )
    {   
        try 
        {
    
            const user = await this.findByEmail( email ) 

            if( !user ) throw new UnauthorizedError(`CHECK SIGNIN DETAILS`)

                logger.info("User:")
                logger.info( String( user._id ) ) 

            if( !user.isVerified ) throw new ForbiddenError(`EMAIL NOT VERIFIED`)


             const passwordValid = await user.comparePassword( password )
             if( !passwordValid ) throw new UnauthorizedError("Password Invalid")


            const { _id, firstname, lastname, learningProfile, newUser, userHasCreatedFirstJobProfile } = user 

            // Data to Store in Jwt 
            const payload = { _id, userHasCreatedFirstJobProfile  } 

             const accessToken = generateJwtToken( payload)
             const refreshToken = generateJwtToken( payload )
            
           


             if( newUser ) 
             {

                    logger.info("User New")
                    // Fetch Learning Areas 
                    const learningModules = await LearningArea.find({})
                    // 

                    const learningModulesGroupedByStage = groupLearningAreasByStage( learningModules )
                    console.dir( learningModulesGroupedByStage ) 
                    
                    return { success: true, data:{ user:{  newUser: true, firstname, lastname }, tokens:{ accessToken, refreshToken}, learningModules: learningModulesGroupedByStage } }  
                     
             }
          
             // User not New Return User profile and Learning Profile Details
             logger.info('User Not New')
             return { data:{   user:{  newUser: false, userId: _id, firstname, lastname, learningProfile}, tokens:{ accessToken, refreshToken }}}
        }
        catch(e: any )
        {
                logger.error(e,"Service: Signin")
                throw e 
        }
    }

    async setUserNewToFalse( userID: string ): Promise<void> 
    {
        try 
        {
            const done = await this.userRepository.setUserNewToFalse( userID )

            if( !done )
            {
                logger.error(`User_Service: User with Id: ${ userID } not Found While trying to update Skip Onboarding `)
                throw new NotFoundError("User Not Found")
            }

        }
        catch(e) 
        {
            logger.error(`Error Occured while Skipping User onboarding for user: ${ userID } `)
            throw new ServerError("Server Error")
        }
    }

    async saveUserLearningModuleOverview( userID: string, learningModuleOverviewArray: ILearningModuleOverview[] ):Promise<void> 
    {
        try 
        {
            const saved = await this.userRepository.saveLearningModuleOverview( userID, learningModuleOverviewArray )

            if( !saved )
            {
                logger.error(`Could not find User with id: ${ userID } to save Learning Summaries `)
                throw new NotFoundError(`Could Not Find User Learning Profile with UserId ${ userID }`)
            }

            logger.info( saved ) 
        }
        catch(e: any )
        {
            if( e instanceof NotFoundError )
            {
                throw e 
            }
                logger.error(e,"Error Occured while Updating User Learning Overview")
                throw new ServerError('SERVER ERROR')
        }
    }
    
    async getLearningModuleOverview( userId: string, moduleId: string ): Promise<ILearningModuleOverview | null > 
    {
        try 
        {
            const learningModuleOverview = await this.userRepository.getLearningModuleOverview( userId, moduleId ) 
            return learningModuleOverview 
        }
        catch(e: any )
        {
            logger.error(e,'User Service: Error Occured While Getting User Learning Profile') 
            throw e 
        }
    }

    async updateLearningModuleCurrentPart(userId: string, moduleId: string, currentPartIndex: number  )
    {
        try 
        {       
            await this.userRepository.updateLearningModuleCurrentPart(userId, moduleId, currentPartIndex )
        }
        catch(e: any)
        {
            logger.error(e,`User Service Error: Error Occured While Updating User Learning Module Current Stage `)
            throw e 
        }
    }

    async markUserHasCreatedFirstJobProfileAsFalse( userId: string )
    {
        await this.userRepository.markUserHasCreatedFirstJobProfileAsFalse( userId ) 
    }   

}// 