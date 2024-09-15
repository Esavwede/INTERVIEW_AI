
import {  Request } from "express-serve-static-core"
import { JwtPayload } from "jsonwebtoken"


export interface IUserRequest 
{
    _id: string, 
    firstname: string, 
    lastname: string, 
    email: string 
}


declare global 
{
    namespace Express 
    {
        interface Request 
        {
            user?: IUserRequest,
            ops: string 
        }
    }
}