
import jwt, { JsonWebTokenError, SignOptions } from "jsonwebtoken" 
import dotenv from "dotenv"
import config from "config"
import logger from "@src/system/logger/logger"
import { Request, Response, NextFunction } from "express-serve-static-core"
import { ServerError } from "../Errors/Endpoints/serverError"
import { IUserRequest } from "types"
import { UnauthorizedError } from "../Errors/Endpoints/unauthorizedError"
dotenv.config() 


export function generateJwtToken( user: object ): string | boolean
{
    try 
    {

        console.log('generating tokens')
        const secretKey = process.env.JWT_SECRET 
        const options: SignOptions = config.get("jwt.options")
    
        if( !secretKey )
        {
            logger.error('JWT SECRET KEY UNDEFINED')
            return false
        }
    
       
        const token = jwt.sign( user, secretKey, options )
        console.log('token generated')
        console.log(token)
        return token 
    }
    catch(e: any)
    {
        logger.error(e,"JWT_SIGNING_ERROR")

        throw new ServerError("Server Encountered Error While Signing User ")
    }
}


export function generateRefreshToken( user: object ): string | boolean
{
    try 
    {
        const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET 
        const options: SignOptions = config.get("jwt.options")
    
        if( !secretKey )
        {
            return false
        }
    
       
        const token = jwt.sign( user, secretKey, options )
 
        return token 
    }
    catch(e: any)
    {
        logger.error(e,"JWT_SIGNING_ERROR")

        throw new ServerError("Server Encountered Error While Signing User ")
    }
}


export function validateRequestToken(req: Request, res: Response, next: NextFunction)
{
    try 
    {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

          // Decode and verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserRequest 

          // Attach the decoded user data to the request object
          req.user = decoded

          if( !req.user._id ) return res.status(500).json({ success: false, msg:"server error"})
         
         next();
    }
    catch(e: any )
    {
        logger.error(e,`Error Occured while validating Request Token `)

        if( e instanceof JsonWebTokenError ) return res.status(401).json({ success: false, msg: e.message })
           
        return res.status(500).json({ success: false, msg:"Server Error"})
    }
}