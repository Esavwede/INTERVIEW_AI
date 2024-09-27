

import { IUpdateLearningModuleDTO } from "@src/DTOs/learningModule/learningModule.dto";
import LearningModuleRepo from "@src/repos/LearningModule/learningModule.repo";
import logger from "@src/system/logger/logger";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import { ILearningModule } from "@src/models/LearningModule";
import { LearningArea } from "@src/models/area";
import { UserService } from "../user/user";
import { UserRepository } from "@src/repos/user/user.repo";
import { LearningModulePartRepo } from "@src/repos/learningModulePart/learningModulePart.repo";
import { LearningModulePartService } from "../learningModulePart/learningModulePart.service";


export class LearningModuleService 
{

    private userService:  UserService 
    private learningModulePartService: LearningModulePartService 

    constructor( private learningModuleRepo: LearningModuleRepo )
    {
        const userRepository = new UserRepository()
        this.userService = new UserService( userRepository )    

        const learningModulePartRepo = new LearningModulePartRepo() 
        this.learningModulePartService = new LearningModulePartService( learningModulePartRepo )
    }

    async create( learningModule:  Pick< ILearningModule,'title' | 'area' | 'stage' | 'stageName' | 'stageNumber' | 'description' | 'imgSrc' | 'isDraft'  > )
    {
           try 
           {
                    const newLearningModule = await this.learningModuleRepo.create( learningModule ) 

                    if( !newLearningModule )
                    {
                        logger.error("Learning Module Was Not Created") 
                        return false 
                    }

                    const learningModuleIsDraft = learningModule.isDraft 

                    if( learningModuleIsDraft  )
                    {
                        logger.info("Service: Learning Module Draft Created")
                        return newLearningModule 
                    }
                    else 
                    {
                         // Save learning Module Details to Area 
                         await LearningArea.updateOne({ _id: learningModule.area },{ $push: { learningModulesUnderArea: newLearningModule } })
                         logger.info("Learning Module Published")
                    }
                    
           }
           catch(e: any )
           {
                logger.error(e,'SERVICE: Error Occured While Creating Learning Module ')
                throw new ServerError('SERVICE: Error Occured While Creating Learning Module ')
           }
    }

    async get( learningModuleId: string  )
    {
            const learningModule = await this.learningModuleRepo.get( learningModuleId )

            if( ! learningModule )
            {
                return false 
            }

            logger.info(`SERVICE: Returning Learning Module with Id: ${ learningModuleId }`)
            return learningModule 
    }

    async update( moduleId: string, learningModuleFields: IUpdateLearningModuleDTO  ): Promise<void> 
    {
        try 
        {
            const modifiedCount = await this.learningModuleRepo.update( moduleId, learningModuleFields )

            if( !modifiedCount )
            {
                throw new NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ID: ${ moduleId }`)
            }
    
        }
        catch(e: any )
        {
            throw new ServerError(`SERVICE: "SERVER_ERROR" : Could Not Update Learning Module With ID: ${ moduleId }`)
        }
    }

    async delete( moduleID: string ): Promise<void> 
    {
        try 
        {
            const deleteCount = await this.learningModuleRepo.delete( moduleID ) 

            if( deleteCount !== 1 )
            {
                logger.error(`SERVICE_ERROR: DELETE_LEARNING_MODULE --> COULD NOT FIND LEARNING MODULE WITH ${ moduleID } FOR DELETION `)
                throw new NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ${ moduleID } FOR DELETION `)
            }

            return 
        }
        catch(e: any )
        {
              throw new ServerError("SERVER ENCOUNTERED ERROR WHILE DELETING LEARNING MODULE")
        }
    }

    async publish( learningModuleId: string, learningModule:  Pick< ILearningModule,'title' | 'area' | 'stage' | 'stageName' | 'stageNumber' | 'description' | 'imgSrc' | 'isDraft' | 'totalParts'> )
    {
        try 
        {
            // Modify isDraft Property on module 
            const modifiedCount = await this.learningModuleRepo.update( learningModuleId, { isDraft: false } )

            if( !modifiedCount )
            {
                logger.error("Did not Find Module To Publish")
                throw new NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ID: ${ learningModuleId } to Publish`)
            }

              // Save learning Module Details to Area 
              const updatedData = await LearningArea.updateOne({ _id: learningModule.area },{ $push: { learningModulesUnderArea: learningModule } })
              console.dir( updatedData ) 

              logger.info("Learning Module Published")
        }
        catch(e)
        {
            logger.error(e,`Service: Error While Publishing Learning Module `)
            throw e 
        }
    }
    
    
    async getPart( userId: string, learningModuleId: string, partNumber: number, totalParts: number ) 
    {
        try 
        {

            if( partNumber > totalParts || partNumber < 1 )
            {
                logger.error(`Part : ${ partNumber } does not exist on Learning Module: ${ learningModuleId } `)
                throw new NotFoundError(`Part ${ partNumber } does not exit on Module`)
            }
     
            var nextPartIndex = partNumber - 1 
            const learningModulePart: any = await this.learningModuleRepo.getNextPart( learningModuleId, nextPartIndex ) 

           // // Check Part Exists 
            if( !learningModulePart )
            {
                logger.error(`Could Not Find Part: ${ nextPartIndex } of Module: ${ learningModuleId } `)
                throw new NotFoundError("Could not find learning module part ")
            } 

            // Update Currrent Part On User Learning Overview 
            await this.userService.updateLearningModuleCurrentPart( userId, learningModuleId, nextPartIndex )
            
            // Return Part 
            return learningModulePart         
        }
        catch(e: any )
        {
            logger.error(e,`Learning Module Service: Error Occured While getting next part of Learning Module: ${ learningModuleId }`)
            throw e 
        }
    }

    async incrementNumberOfParts( moduleId: string )
    {
        await this.learningModuleRepo.incrementNumberOfParts( moduleId )
    }

    async decrementNumberOfParts( moduleId: string )
    {
        await this.learningModuleRepo.incrementNumberOfParts( moduleId )
    }

    async getLearningModulesUnderStage
    ( 
        stageNumber: number,
        page: number, 
        limit: number 
    ): Promise<  Pick<ILearningModule, '_id' | 'title' | 'area' | 'description' | 'stage' | 'stageName' | 'stageNumber' | 'imgSrc' | 'totalParts' | 'partsMetaData'>[] | null >
    {
        try 
        {
            const learningModules = await this.learningModuleRepo.getLearningModulesUnderStage( stageNumber, page, limit ) 

            if( !learningModules ) return null 
            
            return learningModules

        }
        catch(e: any )
        {
            logger.error(e,`LEARNING_MODULE_SERVICE: Error occured while getting learning modules under stage ${ stageNumber }`)
            throw e 
        }
    }


}   