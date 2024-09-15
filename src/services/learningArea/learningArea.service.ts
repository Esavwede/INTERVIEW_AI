import { LearningAreaRepo } from "@src/repos/learningAreas/learningAreas.repo";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import logger from "@src/system/logger/logger";
import { Server } from "http";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ObjectId } from "mongoose"

export class LearningAreaService 
{

    
    constructor( private learningAreaRepository: LearningAreaRepo )
    {

    }

    async create( learningAreaDoc: { area: string } ): Promise< void > 
    {
        try 
        {
          logger.info("SERVICE: Creating Learning Area") 
          await this.learningAreaRepository.create( learningAreaDoc )   
          logger.info("SERVICE: Learning Area Created")
        }
        catch(e: any) 
        {
            logger.error(e,"SERVICE: Error Occured While Creating Learning Area")
            throw new ServerError(" Server Encountered Error While Creating Learning Area")
        }
    }

    async getAll()
    {
        try 
        {
            const learningAreas = await this.learningAreaRepository.getAll() 
            return learningAreas 
        }   
        catch(e: any )
        {
            logger.error(e,`SERVICE: Error Occured While Fetching Service Areas `)
            throw new ServerError(`SERVICE: Error Occured While Fetching Service Areas `)
        }
    }


    async delete( learningAreaId: string ) 
    {
        try 
        {
            const deleteCount = await this.learningAreaRepository.delete( learningAreaId ) 

            if( deleteCount !== 1 )
            {
                logger.error(`SERVICE: Could not find Area with ID:${ learningAreaId } to delete `)
                throw new NotFoundError(`SERVICE: Could not find Area with ID:${ learningAreaId } to delete `)
            }
        }
        catch(e: any) 
        {
            if( e instanceof NotFoundError )
            {
                throw e 
            }

            logger.error(e,`SERVICE: Error Occured While Deleting Area With ID: ${ learningAreaId }`)
            throw new ServerError(`SERVICE: Error Occured While Deleting Area With ID: ${ learningAreaId }`)
        }
    }


}