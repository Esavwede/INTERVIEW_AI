

import logger from "@src/system/logger/logger";
import { generateJobDescriptionWithAI } from "./generateJobDescriptionFromResume";


export async function generateJobDescriptions(

     userJobProfile: { jobRole: string, experienceLevel: string, resume: string } , 
   )

{
    try 
    {
        const numberOfJobDescriptions = 5
        const { jobRole, experienceLevel, resume } = userJobProfile
        var generatedJobDescriptions: string[] = [] 
        let generatedJobDescription

        for( let i = 0; i < numberOfJobDescriptions; i++ )
        {
            generatedJobDescription = await generateJobDescriptionWithAI( jobRole, experienceLevel, resume  )
            generatedJobDescriptions.push( generatedJobDescription ) 
        }

        return generatedJobDescriptions
    }
    catch(e: any)
    {
        logger.error(e,"Error Occured while generating job descriptions ")
    }
}