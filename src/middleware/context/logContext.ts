import {config  } from "dotenv"
config() 
import { Request, Response, NextFunction} from "express-serve-static-core"
import { IUserLogContext } from "types"
import { v4 as uuidv4 } from "uuid" 

export function addUserContext( req: Request, res: Response, next: NextFunction )
{

    if( !req.user?._id ) return res.status(500).json({ success: false, msg: "Server Error"})

    const context: IUserLogContext = 
    {
        userId: req.user?._id, 
        requestId: uuidv4(), 
        endPoint: req.originalUrl, 
        httpMethod: req.method, 
        clientIp: req.ip || 'unknown', 
        environment: process.env.NODE_ENV,
        userAgent: req.headers['user-agent'], 
        timeStamp: new Date().toISOString()   
    }

    
    req.context = context 
    console.log("----Debug-----")
    console.log( req.context  ) 
    next() 
}