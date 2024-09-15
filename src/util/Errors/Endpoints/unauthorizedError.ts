





export class UnauthorizedError extends Error 
{

    public statusCode: number = 401

    constructor( message: string )
    {
        super( message ) 
        this.message = message 

        // Settings 
        Object.setPrototypeOf(this, new.target.prototype); 
        Error.captureStackTrace(this); 
    }


}