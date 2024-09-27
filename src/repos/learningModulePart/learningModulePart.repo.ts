import { ICreateLearningModulePart_Req } from "@src/DTOs/learningModulePart/learningModulePart.dto";
import { ILearningModulePart, IPartContent, LearningModule } from "@src/models/LearningModule";
import logger from "@src/system/logger/logger";


export class LearningModulePartRepo 
{
    
    constructor()
    {
      
    }


    async create( moduleID: string, part: ICreateLearningModulePart_Req): Promise<void> 
    {
        
        await LearningModule.findByIdAndUpdate( moduleID, { $addToSet: {  parts: part , partsMetaData: { title: part.title } }, $inc:{ numberOfParts: 1 } },{ new: false })
    }

    
    async find( learningModuleId: string, partIndex: number )
    {   

        
        const _id =  learningModuleId 
    
            const result = await LearningModule.findOne(
                { _id },
                {  parts: { $slice: [partIndex, 1] }, _id: 0, quizId: 0, title: 0, area: 0, stage: 0, description: 0, imgSrc: 0, numberOfParts: 0 }
              );

            if( !result ) 
            {
                return null 
            }
            
            logger.info('--Debug--1')
            logger.info( result.parts ) 
            
            return result.parts 
    }   


    async update( learningModuleID: string, updates: Pick<IPartContent, '_id' | 'type' | 'value'>[] ): Promise< number > 
    {

      // console.dir( updates ) 

      //     const bulkOperations = updates.map(update => ({
      //       updateOne: {
      //         filter: { learningModuleID: learningModuleID, "parts.content._id": update._id },  // Find document containing the content with matching _id
      //         update: { 
      //           $set: { 
      //             "parts.$[].content.$[contentItem].type": update.type,
      //             "parts.$[].content.$[contentItem].value": update.value
      //           }
      //         },
      //         arrayFilters: [ { "contentItem._id": update._id } ]  // Filter to match specific content _id
      //       }
      //     }));
          
      //     await LearningModule.bulkWrite(bulkOperations);
          

        
      //   const result  = await LearningModule.bulkWrite( bulkOperations )
      //   console.log(" Learning Module Part Updated :")
      //   console.log( result ) 
      //   return result.ok 
    
      const { modifiedCount } = await LearningModule.updateOne({ _id: learningModuleID },{ $set:{ parts: updates } })
      return modifiedCount 
    }


}