
import { LearningModulePartService } from "@src/services/learningModulePart/learningModulePart.service";
import { LearningModulePartRepo } from "@src/repos/learningModulePart/learningModulePart.repo";
import { Request, Response} from "express"
import { LearningModulePartSchema_Create, LearningModulePartSchema_Get, LearningModulePartSchema_Update } from "@src/schemas/learningModulePart/learningModulePart.schema";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import logger from "@src/system/logger/logger";


export class LearningModulePartController 
{
    private learningModulePartService: LearningModulePartService 

    constructor() 
    {
        const learningModulePartRepo = new LearningModulePartRepo() 
        this.learningModulePartService = new LearningModulePartService( learningModulePartRepo )
    }

    async create( req: Request< {},{},LearningModulePartSchema_Create["body"]>, res: Response)
    {
        try 
        {
            await this.learningModulePartService.create( req.body.learningModuleId , req.body ) 
            return res.status(201).json({ success: true, msg:"Learning Module Part Created"})
        }
        catch(e: any )
        {
            return res.status(500).json({ success: false, msg: e.message })
        }
    }
    
    async getPart( req: Request< LearningModulePartSchema_Get['params']>, res: Response)
    {
        try 
        {
            const part = await this.learningModulePartService.find( req.params.moduleId ,req.params.partNumber ) 
            return res.status(200).json({ success: true, data: { part }})
        }
        catch(e: any )
        {
            
            if( e instanceof NotFoundError )
            {
                return res.status( e.statusCode ).json({ success: false, msg: e.message })
            }
                return res.status( e.statusCode ).json({ success: false, message: e.message })
        }
    }

    async update( req: Request<{},{}, LearningModulePartSchema_Update["body"]>, res: Response )
    {
        try 
        {
            const { learningModuleId, content } = req.body

            await this.learningModulePartService.update( learningModuleId, content)
            return res.status(200).json({ success: true, msg:"Learning Module Part Updated"})
        }
        catch(e: any )
        {
            return res.status(500).json({ success: false, msg:"Failed to Update learning module Part "})
        }
    }


}