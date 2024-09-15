
import { ICreateLearningModulePart_Req } from "@src/DTOs/learningModulePart/learningModulePart.dto";
import { LearningModulePartRepo } from "@src/repos/learningModulePart/learningModulePart.repo";
import logger from "@src/system/logger/logger";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import LearningModuleRepo from "@src/repos/LearningModule/learningModule.repo";



export class LearningModulePartService 
{
   
    private learningModuleRepo: LearningModuleRepo 

    constructor( private learningModulePartRepo: LearningModulePartRepo )
    {
        const learningModuleRepo = new LearningModuleRepo() 
        this.learningModuleRepo = learningModuleRepo
    }

    async create( learningModuleID: string, part: ICreateLearningModulePart_Req ): Promise< void > 
    {
        try 
        {
            await this.learningModulePartRepo.create( learningModuleID, part )
            await this.learningModuleRepo.incrementNumberOfParts( learningModuleID ) 
            logger.info("NEW PART ADDED TO LEARNING MODULE")
        }
        catch(e: any) 
        {
            logger.error(e,'DATABASE_ERROR: Error Occured While Adding Part to Learning Module ')
            throw new ServerError("SERVER_ERROR: Error Occured While Adding Part to Learning Module ")
        }
    }

    async find( moduleID: string, partIndexString: string )
    {
        try 
        {

            var partIndex = Number( partIndexString ) 
        
        
            logger.info("SERVICE: Getting Learning Module Part ") 
            console.log(` Typeof partIndex: ${ typeof partIndex }`)
            const part = await this.learningModulePartRepo.find(moduleID, partIndex ) 

            if( !part )
            {
                logger.error(`Did not find part: ${ partIndex } in  ModuleID: ${ moduleID }`)
                throw new NotFoundError(`Did not find part: ${ partIndex } in  ModuleID: ${ moduleID }`)   
            }

            console.log('here')
            console.dir( part ) 
            return part[0]
        }
        catch(e: any )
        {

            if( e instanceof NotFoundError )
            {
                throw e 
            }

            logger.error(e,`DATABASE ENCOUNTERED ERROR WHILE FINDING PART NO: ${ partIndexString }`)
            throw new ServerError(`SERVER ENCOUNTERED ERROR WHILE FINDING PART NO: ${ partIndexString }`)
        }
    }

    async update( learningModuleID: string, updateDoc: any ): Promise<void> 
    {
        try 
        {
            const updated = await this.learningModulePartRepo.update( learningModuleID, updateDoc ) 

            if( !updated )
            {
                logger.error("Failed to Update Part ")
                throw new Error("FAILED TO UPDATE MODULE PART")
            }

            return 
        }
        catch(e: any )
        {
            logger.error(e,'Error Occured while updating Learning Module Part')
            throw new ServerError("Error Occured while updating Learning Module Part")
        }

    }


}