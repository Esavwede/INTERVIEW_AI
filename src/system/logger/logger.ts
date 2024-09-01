import { config } from "dotenv"
config() 

import devLogger from "./devLogger/index" 
import prodLogger from "./prodLogger/index" 
import { Logger } from "pino"

console.log( process.env.NODE_ENV )

var logger: Logger = prodLogger

    try 
    {   
        switch( process.env.NODE_ENV )
        {

            case "development":

                                console.log("Development Logger Created")
                                logger = devLogger
                                break 

            case "production":

                                console.log("Production Logger Created")
                                logger = prodLogger 
                                break

            default:

                                console.log("Unknown Node Environment") 
                                console.log("Using Default Logger: Production Logger")
                                console.log( process.env.NODE_ENV ) 
        }
    }
    catch(e)
    {
        console.log('LOGGER CREATION ERROR') 
        console.log(e)
    }

export default logger 