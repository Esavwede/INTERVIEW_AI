
import pino from "pino" 
import config from "config" 

const prodLogger = pino({
    level: config.get<string>("logger.level"),
    formatters:
    {
        level: (label)=>{ return { level: label }},
        bindings: (bindings)=>{ return { env: "production" } }
    },
    redact: 
    {
        paths: ['password'],
        remove: true 
    }
}) 


export default prodLogger 