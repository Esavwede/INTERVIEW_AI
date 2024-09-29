
import { Express } from "express-serve-static-core"
import { userRoutes } from "./user"
import logger from "@src/system/logger/logger"
import { learningModuleRoutes } from "./LearningModule/learningModule.route"
import { quizModuleRoutes } from "./quiz/quiz.route"
import { learningModulePartRoutes } from "./learningModulePart/learningModulePart"
import { learningAreaRoutes } from "./learningArea/learningArea.route"
import { learningProfileRoutes } from "./learningProfile/learningProfile.route"
import { jobProfileRoutes } from "./jobProfile/jobProfile.route"
import { jobDescriptionRoutes } from "./jobDescription/jobDescription.route"

export function routes( app: Express )
{
    try 
    {
       

        learningProfileRoutes( app ) 
        userRoutes( app ) 
        
        // Learning 
        learningModulePartRoutes( app ) 
        learningModuleRoutes(app) 
        quizModuleRoutes( app ) 
        learningAreaRoutes( app ) 
        jobProfileRoutes(app) 
        jobDescriptionRoutes(app)
      

        logger.info("API ROUTES CREATED")   
    }
    catch(e: any )
    {
        console.log("API ROUTES ERROR")
        console.log(e) 
    }
}