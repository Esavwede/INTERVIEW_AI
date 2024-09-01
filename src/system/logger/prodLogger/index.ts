
import pino from "pino" 
import config from "config" 

const logger = pino({
    level: config.get<string>("logger.level")
}) 


export default logger 