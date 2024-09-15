
import { LearningAreaRepo } from "@src/repos/learningAreas/learningAreas.repo"
import { CreateLearningAreaSchema, DeleteLearningAreaSchema } from "@src/schemas/learningArea/learningArea.schema"
import { LearningAreaService } from "@src/services/learningArea/learningArea.service"
import { Request, Response} from "express-serve-static-core"



export class LearningAreaController 
{
    
    private learningAreaService: LearningAreaService 

    constructor()
    {
        const learningAreaRepo = new LearningAreaRepo() 
        this.learningAreaService = new LearningAreaService( learningAreaRepo )    
    }


    async create( req: Request<{},{}, CreateLearningAreaSchema['body']>, res: Response )
    {
        try 
        {
            await this.learningAreaService.create( req.body )
            return res.status(201).json({ success: true, msg:"Learning Area Created Successfully"})
        }
        catch(e: any )
        {
            res.status( e.status ).json({ success: false, msg: e.message })
        }
    }



    async getAll( req: Request, res: Response )
    {
        try 
        {
            const learningAreas = await this.learningAreaService.getAll(  )
            return res.status(201).json({ success: true, learningAreas})
        }
        catch(e: any )
        {
            res.status( e.status ).json({ success: false, msg: e.message })
        }
    }


    
    async delete( req: Request< DeleteLearningAreaSchema['params']>, res: Response )
    {
        try 
        {
            await this.learningAreaService.delete( req.params.id  )
            return res.status(201).json({ success: true, msg:"Learning Area Deleted Successfully"})
        }
        catch(e: any )
        {
            res.status( e.status ).json({ success: false, msg: e.message })
        }
    }
}