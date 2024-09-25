


import {  Request } from "express-serve-static-core"


interface IUserRequest 
{
    email?: string, 
    _id: string,
    userHasCreatedFirstJobProfile: boolean,
    firstname?: string, 
    lastname?: string
}

interface IUserLogContext
{
    userId: string, 
    requestId: string, 
    endPoint: string, 
    httpMethod: string, 
    clientIp: string, 
    environment: string | undefined,
    userAgent: string | undefined, 
    timeStamp: string 
}

declare global 
{
    namespace Express 
    {
        interface Request 
        {
            user: IUserRequest,
            context?: IUserLogContext,
            resumePath?: string 
        }
    }
}