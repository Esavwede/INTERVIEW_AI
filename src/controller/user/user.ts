import { UserService } from "@src/services/user/user";
import { UserRepository } from "@src/repos/user/user.repo";
import  { Request, Response } from "express-serve-static-core" 
import { SignupInput} from "@src/schemas/user/signupSchema";
import { UserSigninDTO } from "@src/DTOs/user/user";
import logger from "@src/system/logger/logger";
import { generateJwtToken } from "@src/util/Auth/tokens";

// Interfaces 
import { INewUser } from "@src/repos/user/user.repo";


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
        console.log(" Signing up user ")

        const userExists = await this.userService.findByEmail( req.body.email ) 

        
        if( userExists )
        {
            return res.status(409).json({ msg:"Email Taken"})
        }

        const newUser: INewUser = await this.userService.create( req.body )
        
        return res.status(201).json({ status: "success", msg:"user created", data: { newUser } })
    }


    async signin( req: Request<{}, {}, UserSigninDTO>, res: Response )
    {
        try 
        {
             const { password, email } = req.body 

             const user =  await this.userService.findByEmail( email ) 

             if( !user )
            { 
                return res.status(400).json({ msg:"check login details"} )
            }

             const passwordValid = await user.comparePassword( password )

             if( !passwordValid )
             { 
                return res.status(400).json({ msg:"check login details"})
             }

              const accessToken = generateJwtToken( user.toObject() )
              const refreshToken = generateJwtToken( user.toObject() )

              if( !accessToken || !refreshToken )
              { 
                return res.status(500).json({ msg:"Server Error" })
              }
            
             
             return res.status(200).send({ "msg":"signin successfull", body:{ refreshToken, accessToken }})
        }
        catch(e)
        {
            logger.error(e,'SIGNUP ERROR')
            return res.status(500).json({ msg:"server error" })
        }
    }


}