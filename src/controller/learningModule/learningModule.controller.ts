
import { Request, Response } from "express-serve-static-core"
import { LearningModuleService } from "@src/services/LearningModule/learningModule.service";
import LearningModuleRepo from "@src/repos/LearningModule/learningModule.repo";
import logger from "@src/system/logger/logger";
import { CreateLearningModuleSchema, DeleteLearningModule, GetLearningModulePartSchema, GetLearningModulesUnderStageSchema, PublishLearningModuleSchema, UpdateLearningModuleInput  } from "@src/schemas/learningModule/learningModule.schema";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ILearningModule } from "@src/models/LearningModule";
import { IUpdateLearningModuleDTO } from "@src/DTOs/learningModule/learningModule.dto";
import { AnyAppError } from "@src/util/Errors/Endpoints/anyAppError";


export class LearningModuleController 
{

    private learningModuleService 

    constructor( )
    {
        const learningModuleRepo = new LearningModuleRepo() 
        this.learningModuleService = new LearningModuleService( learningModuleRepo ) 
    }

    async create(req: Request<{},{}, CreateLearningModuleSchema['body']>, res: Response)
    {
        try 
        {

            logger.info("Creating Learning Module") 

            const body = req.body as any as Pick< ILearningModule , 'title' | 'description' | 'area' | 'stage' | 'imgSrc' | 'isDraft' >
            const newLearningModule = await this.learningModuleService.create( body )

            if( !newLearningModule )
            {
                return res.status(500).json({ success: false, msg:"SERVER ERROR" })
            }

            return res.status(201).json({ success: true, msg:"Learning MODULE CREATED", data: newLearningModule  })
        }
        catch(e: any)
        {
            logger.error(e)
            return res.status(500).json({ success: false, msg:"SERVER ERROR"})
        }
    }

    async get(req: Request, res: Response)
    {
        try 
        {

            logger.info("Fetching Learning Module") 

            const learningModule = await this.learningModuleService.get( req.params.id )

            if( ! learningModule )
            {
                return res.status(404).json({ success: false, msg:"SERVER ERROR" })
            }

            return res.status(200).json({ success: true, msg:"Learning MODULE FETCHED", data: learningModule  })
        }
        catch(e: any)
        {
            logger.error(e)
            return res.status(500).json({ success: false, msg:"SERVER ERROR"})
        }
    }


    async getLearningModulesUnderStage(
        req: Request<   {}, {}, {},  GetLearningModulesUnderStageSchema['query'] >, 
        res: Response )
    {
        try 
        {
            const stageId = req.query.stageId 
            const page = Number( req.query.page ) 
            const limit = Number( req.query.limit ) 

            if( page <= 0 ) return res.status(400).json({ success: false, msg:"Page cannot be less than 1"})
            if( limit <= 0 ) return res.status(400).json({ success: false, msg:"limit cannot be less than 1"})

            const learningModules = await this.learningModuleService.getLearningModulesUnderStage( stageId, page, limit )
            return res.status(200).json({ success: true, data:{ learningModules }})
        }
        catch(e: any)
        {
            return res.status(500).json({ success: false, msg: "Server Error" })
        }
    }




    async update( req: Request<UpdateLearningModuleInput['params'], {}, UpdateLearningModuleInput['body'] >, res: Response )
    {
        try 
        {
            
            const learningModuleId = req.params.id
            const updateBody = req.body as any as IUpdateLearningModuleDTO 

            await this.learningModuleService.update(  learningModuleId, updateBody )

            logger.info("Learning Module Updated") 
            
            return res.status(200).json({ success: true, msg:"LEARNING MODULE UPDATED" })
        }
        catch(e: any )
        {
            if( e instanceof NotFoundError )
            {
                return res.status( e.statusCode ).json({ success: false, msg: e.message })
            } 

                return res.status(500).json({ success: false, msg:"SERVER ERROR"})
        }
    }

    async publish( req: Request< PublishLearningModuleSchema['params'],{}, PublishLearningModuleSchema['body']>, res: Response )
    {
        try 
        {
            logger.info(`Controller: ublishing Learning Module`)
            const moduleId = req.params.id 
            const moduleContent = req.body as any as Pick< ILearningModule,'title' | 'area' | 'stage' | 'description' | 'imgSrc' | 'totalParts' | 'isDraft' >
            await this.learningModuleService.publish( moduleId,  moduleContent)
            return res.status(200).json({ success: true, msg:"Learning Module Publish Successfully"})
        }
        catch(e: any )
        {
            const err = e as AnyAppError 

            logger.error( err, "--Debug--") 

            if( !err.statusCode ) return res.status(500).json({ success: false, msg: "Server Error" })
            
            return res.status( err.statusCode ).json({ success: false, msg: err.message })
        }
    }

    async delete( req: Request<DeleteLearningModule["params"]>, res: Response )
    {
        try 
        {
            await this.learningModuleService.delete( req.params.id ) 

            return res.status(200).json({ success: true, msg:"Successfully Deleted Learning Module"})
        }
        catch(e: any )
        {

            if( e instanceof NotFoundError )
            {
                return res.status( e.statusCode ).json({ success: false, msg: e.message })
            }

                return res.status(500).json({ success: false, msg: e.message })
        }
    }

    async getPart(req: Request<GetLearningModulePartSchema['params'],{},{},GetLearningModulePartSchema['query']>, res: Response )
    {
        try 
        {
            const userId =  req.user?._id 
            if( !userId ){ return res.status(400).json({ success: false, msg:"could not authenticate user"})}

            const learningModuleId = req.params.moduleId
            const partNumber = Number( req.params.partNumber )
            const totalParts = Number( req.query.totalParts  )

            // learningModuleId 
            const part = await this.learningModuleService.getPart( userId, learningModuleId, partNumber, totalParts ) 
            return res.status(200).json({ success: true, data: { part} }) 

        }
        catch(e: any )
        {
            const err = e as AnyAppError 

            if( !err.statusCode ) return res.status(500).json({ success: false, msg: "Server Error"})

            return res.status( err.statusCode ).json({ success: false, msg: err.message })
        }
    }
    

}
