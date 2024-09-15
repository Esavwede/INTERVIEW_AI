


export class ServerError extends Error 
{

    public statusCode: number = 500 

    constructor( message: string )
    {
        super( message ) 
        this.message = message 

        // Settings 
        Object.setPrototypeOf(this, new.target.prototype); 
        Error.captureStackTrace(this); 
    }


}