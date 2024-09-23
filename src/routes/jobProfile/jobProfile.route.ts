
import { Express } from "express-serve-static-core" 
import { Router } from "express"
import { JobProfileController } from "@src/controller/jobProfile/jobProfile.controller"
import { validateRequestToken } from "@src/util/Auth/tokens"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { CreateJobProfileValidationSchema, DeleteJobProfileValidationSchema } from "@src/schemas/jobProfile/jobProfile.schema"
import { addUserContext } from "@src/middleware/context/logContext"
import { uploadToServer } from "@src/util/upload/doc/uploadDocToServer"
import { ensureRequestDefined } from "@src/middleware/checkRequestDefined/checkRequestDefined"



const router = Router() 

export function jobProfileRoutes( app: Express )
{
    try 
    {
        const jobProfileController = new JobProfileController() 

        router.post
                  ( 
                    '/',                                // Endpoint 
                    validateRequestToken,               // Request Token Validation 
                    uploadToServer.single('resume'),   // Uploads Resume To Server 
                    validateRequestSchema( CreateJobProfileValidationSchema ), // Request Schema Validation 
                    addUserContext,                    // Adds User Context To Logs 
                    jobProfileController.create.bind( jobProfileController ) // Controller 
                  ) 

        router.get
                  ( 
                    '/',                                // Endpoint 
                    validateRequestToken,               // Request Token Validation 
                    addUserContext,                    // Adds User Context To Logs 
                    ensureRequestDefined,
                    jobProfileController.getUserJobProfiles.bind( jobProfileController ) // Controller 
                  ) 

        router.delete
                  ( 
                    '/:id',                                // Endpoint 
                    validateRequestToken,               // Request Token Validation 
                    validateRequestSchema( DeleteJobProfileValidationSchema ),
                    addUserContext,                    // Adds User Context To Logs 
                    jobProfileController.deleteJobProfileFromJobProfiles.bind( jobProfileController ) // Controller 
                  ) 


        app.use('/api/v1/job-profiles', router )

    }
    catch(e: any )
    {

    }
}