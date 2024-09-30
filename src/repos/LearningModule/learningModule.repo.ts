

import { LearningModule, ILearningModule  } from "@src/models/LearningModule";
import { IUpdateLearningModuleDTO } from "@src/DTOs/learningModule/learningModule.dto";
import logger from "@src/system/logger/logger";

export default class LearningModuleRepo
{

    constructor()
    {

    }

    async create( learningModuleDoc: Pick< ILearningModule, 'title' | 'area' | 'stage' | 'stageName' | 'stageNumber' |  'description' | 'imgSrc' | 'isDraft' >  ): Promise< { learningModuleId: string, title: string, stage: string } | false > 
    {
        try 
        {
            const  learningModule: ILearningModule = await LearningModule.create( learningModuleDoc )

            return { learningModuleId: learningModule._id as string , title: learningModule.title, stage: learningModule.stage as unknown as string  } 
        }
        catch(e: any)
        {
            logger.error(e,"RepoError: Create Learning Module")
            return false 
        }
    }  

    async get( moduleId: string ):Promise<    Pick<ILearningModule,'title' | 'description' | 'area' | 'stage' | 'stageName' | 'stageNumber' | 'imgSrc'> | boolean  > 
    {
        try 
        {
            const learningModule = await LearningModule.findById( moduleId ).select('title description area stage imgSrc').lean() 

            if( !learningModule )
            {
                return false 
            }

            return learningModule 
        }
        catch(e: any)
        {
            logger.error(e,`REPO ERROR: COULD NOT GET MODULE WITH ID ${ moduleId }`)
            return false 
        }
    }

    async update( moduleID: string, moduleFields: IUpdateLearningModuleDTO ): Promise<number> 
    {
            const { modifiedCount} = await LearningModule.updateOne({ _id: moduleID }, moduleFields, { rawResult: true })

            logger.info(`Repo: Module Modified: ${ modifiedCount } `)
            return modifiedCount 
    }

    async delete( _id: string ): Promise<number> 
    {
        const { deletedCount } = await LearningModule.deleteOne({ _id }).lean() 
        return deletedCount
    }


    async getUserLearningOverview( userId: string, learningModuleId: string, currentPartIndex: number )
    {
        const userLearningOverview = await LearningModule.findOne({ _id: userId, "learningProfile._id": learningModuleId },{  "learningProfile.$": 1}) 

        console.log(' ----Here ---')
        console.dir( userLearningOverview ) 
    }     

    async getNextPart( moduleId: string, nextPartIndex: number )
    {

        logger.info('Getting Learning Module Next Part')
        const result= await LearningModule.findById(moduleId).select('parts').lean() 

        if( !result ) return null 
    
        const { parts } = result 
        
        console.log('-----')
        console.dir( parts )

        if( parts ) {
            
            if( !parts[nextPartIndex] )
            {
                logger.info(` Part: ${ nextPartIndex } does not exist on Module: ${ moduleId } `)
                return null 
            }
            
            return parts[nextPartIndex] 
        
        }
        return null 
    }

    async incrementNumberOfParts( moduleId: string )
    {
        await LearningModule.updateOne({ _id: moduleId },{ $inc: { totalParts: 1 }})
    }

    async decrementNumberOfParts( moduleId: string )
    {
        await LearningModule.updateOne({ _id: moduleId },{ $inc: { totalParts: -1 }})
    }

    async getLearningModulesUnderStage(
        stageNumber: number
      ): Promise<   Pick<   ILearningModule, '_id' | 'title' | 'area' | 'description' |'stage' | 'stageName' | 'stageNumber' | 'imgSrc' | 'totalParts' | 'partsMetaData' >[] | null> {

        // Define the fields to be selected in the query
        const fields = '_id title area description imgSrc stage stageName stageNumber totalParts partsMetaData';
      
        // Calculate the number of documents to skip based on the current page
        

        // Fetch the learning modules with the specified stage ID
        const learningModules = await LearningModule.find({ stageNumber, isDraft: false  })
          .select(fields)
      
            // Return null if no learning modules are found
            if (learningModules.length === 0) return null 
      
            // Return the found learning modules
            return learningModules;
      }
      
} 