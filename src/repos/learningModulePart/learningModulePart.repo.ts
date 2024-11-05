import { ICreateLearningModulePart_Req } from "@src/DTOs/learningModulePart/learningModulePart.dto";
import {  LearningModule } from "@src/models/LearningModule";
import {  IPartContent } from "@src/models/learningModulePart";
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

    
    async find( _id: string, partIndex: number )
    {   
            const result = await LearningModule.findOne(
                { _id },
                {  parts: { $slice: [partIndex, 1] }, _id: 0, quizId: 0, title: 0, area: 0, stage: 0, description: 0, imgSrc: 0, numberOfParts: 0 } )

            if( !result ) return null 

            return result.parts 
    }   

    async update( learningModuleID: string, updates: Pick<IPartContent, '_id' | 'type' | 'value'>[] ): Promise< number > 
    {
       const { modifiedCount } = await LearningModule.updateOne({ _id: learningModuleID },{ $set:{ parts: updates } })
       return modifiedCount 
    }


}