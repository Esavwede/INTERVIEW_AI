


import {  Express } from "express-serve-static-core"
import { Router } from "express"
import logger from "@src/system/logger/logger"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { QuizController } from "@src/controller/quiz/quiz.controller"
import { CreateQuizValidationSchema, DeleteQuizValidationSchema, FindQuizValidationSchema, UpdateQuizValidationSchema } from "@src/schemas/quiz/quiz.schema"


const router = Router() 

export function quizModuleRoutes(app: Express )
{
    try 
    {

        const quizController = new QuizController() 


        // Create Learning Module 
        router.post('/', validateRequestSchema( CreateQuizValidationSchema), quizController.create.bind( quizController ))
        

        // Get Learning Module 
        router.get('/:id', validateRequestSchema( FindQuizValidationSchema), quizController.get.bind( quizController ) ) 

        // Update Learning Module 
        router.patch('/:id', validateRequestSchema( UpdateQuizValidationSchema ), quizController.update.bind( quizController ) )


        router.delete('/:id', validateRequestSchema( DeleteQuizValidationSchema ), quizController.delete.bind( quizController ) )

        
        app.use('/api/v1/quizzes', router )

        logger.info("Quiz Routes Built")
    }
    catch(e: any)
    {
        logger.error(e,"QUIZ ROUTE ERROR") 
    }
}