import { UserService } from "@src/services/user/user";
import { UserRepository } from "@src/repos/user/user.repo";
import  { Request, Response } from "express-serve-static-core" 
import { MarkLearningModuleAsCompletedSchema, SaveUserFirstAndLastNameSchema, SignupInput, VerifyUserSchema} from "@src/schemas/user/signupSchema";
import { UserSigninDTO } from "@src/DTOs/user/user";
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config() 

// Interfaces 
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { SaveLearningModuleOverviewSchema } from "@src/schemas/learningModule/learningModule.schema";
import { ILearningModuleOverview } from "@src/models/learningProfile";
import { AnyAppError } from "@src/util/Errors/Endpoints/anyAppError";
import { ConflictError } from "@src/util/Errors/Endpoints/conflictError";
import logger from "@src/system/logger/logger";
import { generateJwtToken } from "@src/util/Auth/tokens";
import { IUserRequest } from "types";
import { startRedis } from "@src/middleware/cache/redisClient";


export class UserController 
{

    private userService: UserService

    constructor()
    {
        const userRepository = new UserRepository() 
        this.userService = new UserService( userRepository ) 
    }   


    async signup(req: Request<{}, {}, SignupInput["body"]>, res: Response)
    {
        try 
        {
                 

        logger.info(`User_Signup_Controller: Signin Up New User`)

        const email = req.body.email 
        const userExists = await this.userService.findByEmail( email ) 

        if( userExists )
        {
            logger.info(`User Email: ${ email } Taken `)
            throw new ConflictError("Account with this email exists")
        }

        const protocol = req.protocol || 'https' || 'http'
        const host = req.get('host') || 'localhost:3000'
        const domain = `${protocol}://${host}`

        await this.userService.create( req.body, domain  )
        
        return res.status(201).json({ status: "success", msg:"User Signup Successfull" })

        }
        catch(e: any )
        {
            const err: AnyAppError = e as AnyAppError

            if( !err.statusCode ) return res.status(500).json({ success: false, msg:"SERVER ERROR"})

            return res.status( err.statusCode ).json({ success: false, msg: err.message })
        }
    }

    async signin( req: Request<{}, {}, UserSigninDTO>, res: Response )
    {
        try 
        {
             const { password, email } = req.body 

             const response = await this.userService.signin( email, password )

             return res.status(200).json( response ) 
        
        }
        catch(e: any )
        {
            const err = e as AnyAppError
            console.log(err) 
            if( !err.statusCode ) return res.status(500).json({ success: false, msg:"Server Error"}) 
            return res.status( err.statusCode  ).json({ success: false, message: e.message })
        }
    }

    async update(req: Request<{},{},SaveUserFirstAndLastNameSchema['body']>, res: Response )
    {
        try 
        {
            const userId = req.user?._id

            if( !userId ) return res.status(500).json({ success: false, msg:"Server Error" })

            const updateBody = req.body 

            await this.userService.update( userId, updateBody ) 

            return res.status(200).json({ success: true, msg:"User Update Successful"})
        }
        catch(err: any )
        {
            const e = err as AnyAppError 

            if( !e.statusCode ) return res.status(500).json({ success: false, msg:"Server Error"})
                
            return res.status( e.statusCode ).json({ success: false, msg: e.message }) 
        }
    }


    async signinWithGoogle(req: Request, res: Response )
    {
        try 
        {
           
            var user = req.user 

            console.log( req.user ) 
            if( !user ) return res.status(500).json({ success: false, msg:"User Object Empty" })
                
            // User Details 
            const { _id, firstname, lastname,email, learningProfile, newUser, userHasCreatedFirstJobProfile } = user 
            const signDetails = { _id, email,  firstname,lastname }

            // JWT Tokens 
            const accessToken = generateJwtToken( signDetails )
            const refreshToken = generateJwtToken( signDetails )
           
    
            // Data For NewUser 
            const newUserReturnData = { user:{  newUser: true, firstname, lastname, userHasCreatedFirstJobProfile }, tokens:{ accessToken, refreshToken}  }

            if( newUser ) 
            {
                return res.status(200).json({ success: true, data: newUserReturnData } ) // Returns New User Details  
            }
            
            const userReturnData = {  user:{  newUser: false, userId: _id, firstname, lastname, userHasCreatedFirstJobProfile,  learningProfile}, tokens:{ accessToken, refreshToken } }

            return res.status(200).json({ success: true, data: userReturnData }) // Returns User Details 
        }
        catch( err : any ) 
        {
            const e = err as AnyAppError 
            if( !e.statusCode ) return res.status(500).json({ success: false, msg: "Server Error" })

            return res.status( e.statusCode ).json({ success: false, msg: e.message }) 
        }
    }

    async verifyUser( req: Request<{},{},{}, VerifyUserSchema['query']>, res: Response)
    {
        try 
        {
            const userID = req.query.token 

            await this.userService.verifyUser( userID ) 
        
            return res.redirect('https://interviewaiafrotech.netlify.app/auth/login')
        }
        catch(e: any)
        {
            const err = e as AnyAppError

            if( !err.statusCode ) return res.status(500).json({ success: false, msg:"Server Error"})

            return res.status( err.statusCode ).json({ success: false, msg: err.message })
        }
    }

    async skipOnboarding(req: Request, res: Response)
    {
        try 
        {
            const userId = req.user?._id 
            if( !userId ){ return res.status(400).json({ success: false, msg:"could not authenticate user"})}

            await this.userService.setUserNewToFalse( userId )
            return res.status(200).json({ success: true, msg:"Onboarding Skipped"})
        }
        catch(e: any)
        {
            if( e instanceof NotFoundError )
            {
                return res.status( e.statusCode ).json({ success: false, msg: e.message })
            }

                return res.status(500).json({ success: false, msg: "Server Error"})
        }
    }

    async addLearningModulesToUserProfile(req: Request<{},{},SaveLearningModuleOverviewSchema['body']>, res: Response)
    {
        try 
        {
            const userId = req.user?._id 
            if( !userId ) return res.status(401).json({ success: false, msg:"could not authenticated user"})
            
            const learningModuleOverview = req.body.learningModules as unknown as ILearningModuleOverview[]
            await this.userService.saveUserLearningModuleOverview( userId, learningModuleOverview)
            return res.status(200).json({ success: true, msg:"Learning Modules Overview Saved to user Learning Profile"})
        }
        catch(e: any)
        {
           
                const err = e as AnyAppError
                if( !err.statusCode ) return res.status(500).json({ success: false, msg: 'Server Error' })
                
                return res.status( err.statusCode ).json({ success: false, msg: err.message }) 
        }
    }

    async markUserLearningPartAsComplete(req: Request<{},{}, MarkLearningModuleAsCompletedSchema['body']>, res: Response )
    {
        try 
        {
            const {_id,partTitle  } = req.body 
            const userId = req.user?._id || '' 


            this.userService.markLearningModulePartAsCompleted( userId, _id, partTitle )
            return res.status(200).json({ success: true, msg:"Successfully marked part as completed"})
        }
        catch(err: any )
        {
            const e = err as AnyAppError

            if( !e.statusCode ) return res.status(500).json({ success: false, msg: e.message })
            return res.status(e.statusCode).json({ success: false, msg: e.message })
        }
    }

    async getNewAccessToken(req: Request, res: Response)
    {

        const cache = await startRedis() 

                try 
                {
                    
                    const { refreshToken } = req.body;
                    if (!refreshToken) return res.sendStatus(401);
                    
                    
                    var refreshTokenValue = await cache?.get(refreshToken)
                    console.log( refreshTokenValue )
                    console.log(':::>')
                    if (!refreshTokenValue) return res.sendStatus(403);

                    refreshTokenValue = refreshTokenValue.replace(/"/g, '')
                
                    const decoded = jwt.verify(refreshTokenValue, process.env.JWT_REFRESH_TOKEN_SECRET || '' )

                    const token = generateJwtToken( decoded as IUserRequest)

                    return res.status(200).json({ success: true, accessToken: token })
                }
                catch(e: any)
                {
                    logger.error(e,'here....')
                    return res.status(500).json({ success: false, msg: e.message })
                }
                finally 
                {
                    await cache?.quit() 
                }
    }

} 