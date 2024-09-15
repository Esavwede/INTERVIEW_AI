

import { ILearningProfile } from "@src/models/learningProfile"
import { LearningProfileRepo } from "@src/repos/learnningProfile/learningProfile.repo"
import { CreateLearningProfileSchema  } from "@src/schemas/learningProfile/learningProfile.schema"
import { LearningProfileService } from "@src/services/learningProfile/learningProfile.service"
import { Response, Request} from "express-serve-static-core"



export class LearningProfileController 
{

    private learningProfileService 

    constructor()
    {
        const learningProfileRepo = new LearningProfileRepo() 
        this.learningProfileService = new LearningProfileService( learningProfileRepo ) 
    }


    async create( req: Request<{},{}, CreateLearningProfileSchema['body'] >, res: Response)
    {
        try 
        {
            const body = req.body as Pick< ILearningProfile , 'userId' | 'learningModules'> 
            const { userId } = body 

            const userExists = await this.learningProfileService.findOne( userId )

            if( userExists )
            {
                return res.status(409).json({ success: false, msg:"USER LEARNING PROFILE ALREADY EXISTS"})
            }
            
            await this.learningProfileService.create( body ) 
            return res.status(201).json({ success: true, msg:"LEARNING PROFILE CREATED SUCCESSFULLY"})
        }
        catch(e: any) 
        {
            return res.status( e.statusCode ).json({ success: false, msg: e.message })
        }
    }


}
