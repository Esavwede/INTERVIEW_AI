

import { UserRepository } from "@src/repos/user/user.repo"
import { UserDTO } from "@src/DTOs/user/user"
import { sendMail } from "@src/util/mail/sendMain"
import { ServerError } from "@src/util/Errors/Endpoints/serverError"
import   logger from "@src/system/logger/logger"
import { config } from "dotenv"
import { UnauthorizedError } from "@src/util/Errors/Endpoints/unauthorizedError"
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError"
import { generateJwtToken, generateRefreshToken } from "@src/util/Auth/tokens"
import { ILearningModuleOverview } from "@src/models/LearningModule"
import { ForbiddenError } from "@src/util/Errors/Endpoints/forbiddenError"
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
        
            logger.debug('Create User Service: Creating new user...')

             // User Email 
             const { email } = user 

            // Create new user             
            const userId: string  = await this.userRepository.create( user ) 

            logger.debug('Create User Service: User created. UserId:' + userId )

            // Create email verification link 
            const verificationLink = `${domain}/api/v1/users/verify?token=${ userId }`
           
            // Verification mail body 
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

            // mail payload 
            const mailOptions = 
            {
                email, 
                subject: 'Welcome To Interview AI',
                text: 'Welcome to InterviewAI. Please visit here to verify',
                html:  htmlBody 
            }
            
            await sendMail( mailOptions ) 
            logger.info('Create User Service: Verification mail sent to user: ' + userId )
       }
       catch(e)
       {
            logger.error(e,`Create User Service: Error occured while creating New User `)
            throw new ServerError( e.message ) 
       }
    }


    async findByEmail( email: string ): Promise< IUser | null > 
    {
       try 
       {
            const user = await this.userRepository.findByEmail( email ) 

            if( user )
            {
                logger.info('Find By Email Service: Found User With Email. UserId: ' + user._id )
                return user 
            }
                logger.info('No User With Email')
                return null 
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

            logger.debug(`User: ${ userId } successfully updated `)
        }
        catch(e: any )
        {
            logger.error(e,`Update User Service: Error Occured while Updating User: ${ userId }  `)
            throw e
        }
    }


    async verifyUser( userID: string )
    {
        try 
        {
            const userVerified = await this.userRepository.markUserAsVerified( userID ) 

            if( !userVerified )
            {
                logger.error(`Could not find user with ID: ${ userID } for verification `)
                return new UnauthorizedError("Invalid Validation Link")
            }

                logger.info(`Verify Email Service: User: ${ userID } email verified`)
        }
        catch(e)
        {
            logger.error(e,'Verify User Service: Error Occured while verifying user:  ' + userID ) 
            throw new ServerError("Error Occured While Finding User By Id ") 
        }
    }


    async signin( email: string, password: string  )
    {   

        try 
        {
    
            const user = await this.findByEmail( email ) 

            if( !user ) throw new UnauthorizedError(`CHECK SIGNIN DETAILS`)

            if( !user.isVerified )
            {
                logger.info(`Signin Service: User: ${ user._id } email unverified. Cannot Signin to dashboard`)
                throw new ForbiddenError(`EMAIL NOT VERIFIED`)
            }

             const passwordValid = await user.comparePassword( password )

             if( !passwordValid )
             {
                logger.warn(`Sigin Service: User: ${ user._id }'s provided password incorrect`)
                throw new UnauthorizedError("Password Invalid")
             }


            // User Data 
            const { _id, firstname, lastname, learningProfile, userHasCreatedFirstJobProfile } = user 

             // Data to Store in Jwt 
             const payload = { _id, userHasCreatedFirstJobProfile  } 

             const accessToken = generateJwtToken( payload)
             const refreshToken = generateRefreshToken( payload )


             if( !firstname && !lastname )// User Has Not Saved Firstname and Lastname
             {
                return { data:{   user:{  newUser: false, userId: _id, firstname: null, lastname: null, userHasCreatedFirstJobProfile, learningProfile }, tokens:{ accessToken, refreshToken }}}
             }
             
             // User not New Return User profile and Learning Profile Details
             return { data:{   user:{  newUser: false, userId: _id, firstname, lastname, userHasCreatedFirstJobProfile, learningProfile }, tokens:{ accessToken, refreshToken }}}
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

    async saveUserLearningModuleOverview( userID: string, learningModuleOverview: ILearningModuleOverview ):Promise<void> 
    {
        try 
        {
            const saved = await this.userRepository.saveLearningModuleOverview( userID, learningModuleOverview )

            if( !saved )
            {
                logger.error(`Could not find User with id: ${ userID } to save Learning Summaries `)
                throw new NotFoundError(`Could Not Find User Learning Profile with UserId ${ userID }`)
            }
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
             return await this.userRepository.getLearningModuleOverview( userId, moduleId )
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

    async markLearningModulePartAsCompleted( userId: string, learningModuleId: string, partTitle: string )
    {
        try 
        {
            const markedAsCompleted = await this.userRepository.markLearningModulePartAsCompleted( userId, learningModuleId, partTitle )

            if( !markedAsCompleted )
            {
                throw new NotFoundError(`Could not find module part: ${ partTitle } on user learning profile`)
            }

            logger.debug('User learning module part marked as complete') 
        }
        catch(e: any)
        {
            logger.error(e,'USER_SERVICE_ERROR: Error occured while marking User learning module part as completed ')
            throw e 
        }
    }

}