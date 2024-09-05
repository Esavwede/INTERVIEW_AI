
import logger from "@src/system/logger/logger"
import { Request, Response, NextFunction } from "express-serve-static-core"
import { AnyZodObject, z } from "zod" 


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
            return res.status(400).json({ msg:"bad request", body: { errors: e.errors } })
        }
    }
}