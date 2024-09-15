
import { ILearningProfile } from "@src/models/learningProfile";
import { LearningProfileRepo } from "@src/repos/learnningProfile/learningProfile.repo";
import logger from "@src/system/logger/logger";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import { Types } from "mongoose";


export class LearningProfileService 
{

    constructor( private learningProfileRepo: LearningProfileRepo )
    {

    }


    async create( learningProfileDoc: Pick< ILearningProfile, 'userId' | 'learningModules' > ): Promise< void > 
    {
        try 
        {
            logger.info("SERVICE: Creating Learning Profile ") 
            await this.learningProfileRepo.create( learningProfileDoc )
            
            logger.info("Learning Profile Created") 
        }
        catch(e: any)
        {
            logger.error(e,`SERVICE: Error Occured While Creating Learrning Profile`)
            throw new ServerError(`SERVICE: Error Occured While Creating Learrning Profile`)
        }
    }

    
    
    async findOne( userId: string | Types.ObjectId ): Promise< boolean > 
    {
        try 
        {
    
            logger.info("SERVICE: Finding Learning Profile ") 
            const learningProfile = await this.learningProfileRepo.findOne( userId )
            
            if( learningProfile )
            {
                logger.info("Learning Profile Already Exists for user with id %s ", userId)
                logger.info( learningProfile )  
                return true 
            }

                return false 
        }
        catch(e: any)
        {
            logger.error(e,`SERVICE: Error Occured While Creating Learrning Profile`)
            throw new ServerError(`SERVICE: Error Occured While Creating Learrning Profile`)
        }
    }
    
} 