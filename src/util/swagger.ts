
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express" 
import logger from "@src/system/logger/logger";
import { Express } from "express-serve-static-core"



export function swaggerInit(app: Express )
{
    try 
    {
        const options: swaggerJSDoc.Options = 
        {
            definition:
            {
                openapi: '3.0.0',
                info:
                {
                    title:'my api',
                    description: 'my api',
                    version: '1.0.0' 
                }
            },
            apis: ['./src/routes/**/*.ts']
        }

        const openapiSpecs = swaggerJSDoc( options ) 


        app.use('/docs', swaggerUI.serve, swaggerUI.setup( openapiSpecs ))
        
    }
    catch(e: any)
    {
        logger.error(e,'SWAGGER INIT ERROR')
        console.log(e)
    }
}