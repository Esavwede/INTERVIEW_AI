
import jwt, { SignOptions} from "jsonwebtoken" 
import dotenv from "dotenv"
import config from "config"
import logger from "@src/system/logger/logger"
dotenv.config() 


export function generateJwtToken( user: object ): string | boolean
{
    const secretKey = process.env.JWT_SECRET 
    const options: SignOptions = config.get("jwt.options")

    if( !secretKey )
    {
        logger.error('JWT SECRET KEY UNDEFINED')
        return false
    }

    const token = jwt.sign( user, secretKey, options )
    return token 
}

