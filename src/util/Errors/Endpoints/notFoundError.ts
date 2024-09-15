

export class NotFoundError extends Error 
{

    public statusCode: number = 404 

    constructor( message: string )
    {
        super( message ) 
        this.message = message 

        // Settings 
        Object.setPrototypeOf(this, new.target.prototype); 
        Error.captureStackTrace(this); 
    }


}