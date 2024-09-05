
import { Express } from "express-serve-static-core"
import { userRoutes } from "./user"
import logger from "@src/system/logger/logger"

export function routes( app: Express )
{
    try 
    {
        userRoutes( app ) 
        logger.info("API ROUTES CREATED") 
    }
    catch(e: any )
    {
        console.log("API ROUTES ERROR")
        console.log(e) 
    }
}