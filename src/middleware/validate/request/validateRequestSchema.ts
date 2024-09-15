
import logger from "@src/system/logger/logger"
import { Request, Response, NextFunction } from "express-serve-static-core"
import { AnyZodObject, z, ZodError } from "zod" 


export function validateRequestSchema( schema: AnyZodObject )
{
    return (req: Request, res: Response, next: NextFunction )=>
    {

        try 
        {
            schema.parse(
                {
                    body: req.body,
                    query: req.query, 
                    params: req.params
                }
            )

            next() 
        }
        catch(e: any)
        {
            logger.error(e,'Request Schema Error')

           if( e instanceof ZodError )
           {

             var errs: string[] = [] 
             e.errors.forEach((e)=>{  errs.push(e.message) })
             
             return res.status(422).json({ success: false, msg:"bad request", errors: errs  })
           }
          
           return res.status(500).json({ success: false, msg:"Server Error"})
        }
    }
}