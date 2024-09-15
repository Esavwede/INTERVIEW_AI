

import {  Express } from "express-serve-static-core"
import { Router } from "express"
import logger from "@src/system/logger/logger"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { LearningModulePartValidationSchema, UpdateLearningModulePartSchema } from "@src/schemas/learningModulePart/learningModulePart.schema"
import { LearningModulePartController } from "@src/controller/learningModulePart/learningModulePart.controller"


const router = Router() 


export function learningModulePartRoutes(app: Express )
{
    try 
    {

        const learningModulePartController = new LearningModulePartController() 


        // Create Learning Module 
        router.post('/', validateRequestSchema( LearningModulePartValidationSchema ), learningModulePartController.create.bind( learningModulePartController ))
        
        // Update 
        router.patch('/', validateRequestSchema( UpdateLearningModulePartSchema ), learningModulePartController.update.bind( learningModulePartController ))

        app.use('/api/v1/part', router )

        logger.info("Learning Module Part Routes Built")
    }
    catch(e: any)
    {
        logger.error(e,"LEARNING MODULE PART ROUTES ERROR") 
    }
}