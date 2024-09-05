
import pino from "pino" 
import config from "config" 

const prodLogger = pino({
    level: config.get<string>("logger.level"),
    redact: 
    {
        paths: ['password'],
        remove: true 
    }
}) 


export default prodLogger 