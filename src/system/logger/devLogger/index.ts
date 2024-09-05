

import pino from "pino" 
import config from "config" 

const devLogger = pino(
    {
        level: config.get<string>("logger.level"),
        redact:
        {
            paths: ['password'],
            remove: true 
        }
    }
) 


export default devLogger 