
import { Express } from "express-serve-static-core"
import { userRoutes } from "./user"
import   logger from "@src/system/logger/logger"
import { learningModuleRoutes } from "./LearningModule/learningModule.route"
import { quizModuleRoutes } from "./quiz/quiz.route"
import { learningModulePartRoutes } from "./learningModulePart/learningModulePart"
import { jobProfileRoutes } from "./jobProfile/jobProfile.route"
import { jobDescriptionRoutes } from "./jobDescription/jobDescription.route"

export function routes( app: Express )
{
    try 
    {
       
        userRoutes( app ) 
        learningModulePartRoutes( app ) 
        learningModuleRoutes(app) 
        quizModuleRoutes( app ) 
        jobProfileRoutes(app) 
        jobDescriptionRoutes(app)

        logger.info("API ROUTES CREATED")   
    }
    catch(e: any )
    {
        logger.error(e,"Routes_Error")
    }
}