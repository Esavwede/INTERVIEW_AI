



import {  Express } from "express-serve-static-core"
import { Router } from "express"
import logger from "@src/system/logger/logger"
import { LearningAreaController } from "@src/controller/learningArea/learningArea.controller"
import { CreateLearningAreaValidationSchema, DeleteLearningAreaValidationSchema } from "@src/schemas/learningArea/learningArea.schema"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"

const router = Router() 

export function learningAreaRoutes(app: Express )
{
    try 
    {

        const learningAreaController = new LearningAreaController()


        // Create Learning Area  
        router.post('/', validateRequestSchema( CreateLearningAreaValidationSchema ), learningAreaController.create.bind( learningAreaController ))

        // Delete Learning Area 
        router.get('/',  learningAreaController.getAll.bind( learningAreaController ))

        // Delete Learning Area 
        router.delete('/:id', validateRequestSchema( DeleteLearningAreaValidationSchema ), learningAreaController.delete.bind( learningAreaController ))


        app.use('/api/v1/learning-area', router )

        logger.info("LEARNING AREA Routes Built")
    }
    catch(e: any)
    {
        logger.error(e,"LEARNING AREA ROUTE ERROR") 
    }
}