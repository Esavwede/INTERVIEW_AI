

import { Express } from "express-serve-static-core" 
import { Router } from "express"
import { JobProfileController } from "@src/controller/jobProfile/jobProfile.controller"
import { validateRequestToken } from "@src/util/Auth/tokens"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { GenerateJobDescriptionsValidationSchema } from "@src/schemas/jobProfile/jobProfile.schema"


const router = Router() 

export function jobDescriptionRoutes( app: Express )
{
    try 
    {

      const jobProfileController = new JobProfileController() 

        router.post 
                  ( 
                    '/generate', 
                    validateRequestToken, 
                    validateRequestSchema( GenerateJobDescriptionsValidationSchema ),
                    jobProfileController.generateJobDescriptions.bind( jobProfileController ) 
                  )


        app.use('/api/v1/jobDescription', router )

    }
    catch(e: any )
    {

    }
}