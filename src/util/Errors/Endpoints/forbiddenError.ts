


export class ForbiddenError extends Error
{
    public statusCode: number = 403

    constructor( message: string )
    {
        super( message ) 
        this.message = message 

        // Settings 
        Object.setPrototypeOf(this, new.target.prototype); 
        Error.captureStackTrace(this); 
    }

}