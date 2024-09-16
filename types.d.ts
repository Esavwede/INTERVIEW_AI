


import {  Request } from "express-serve-static-core"


interface IUserRequest 
{
    email: string, 
    _id: string,
    firstname, 
    lastname 
}

declare global 
{
    namespace Express 
    {
        interface Request 
        {
            user: IUserRequest 
        }
    }
}