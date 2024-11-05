
import { LearningArea } from "@src/models/area"
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


    async delete( learningAreaId: string ): Promise<number> 
    {
        const { deletedCount } = await LearningArea.deleteOne({ _id: learningAreaId })
        return deletedCount
    }

}