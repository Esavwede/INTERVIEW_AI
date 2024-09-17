
import { ILearningArea, LearningArea } from "@src/models/area"
import logger from "@src/system/logger/logger"



export class LearningAreaRepo 
{
    
    constructor()
    {

    }

    

    async create( learningAreaDoc: { area: string } ): Promise<void> 
    {
        await LearningArea.create( learningAreaDoc )
        logger.info("DATABASE: Created Learning Area ") 
    }


    async getAll(): Promise<  Pick< ILearningArea , '_id' | 'area' | 'learningModulesUnderArea' >[] | null  >
    {
        const result = await LearningArea.find({},{ _id: 1, name: 1, learningModulesUnderArea: 1}).lean() 
        return result 
    }


    async delete( learningAreaId: string ): Promise<number> 
    {
        const { deletedCount } = await LearningArea.deleteOne({ _id: learningAreaId })
        return deletedCount
    }

}