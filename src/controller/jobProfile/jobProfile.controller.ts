

import { AnyAppError } from "@src/util/Errors/Endpoints/anyAppError"
import { Request, Response } from "express-serve-static-core"
import   logger from "@src/system/logger/logger"
import { JobProfileService } from "@src/services/jobProfile/jobProfile.service"
import { CreateJobProfileSchema, DeleteJobProfileSchema, GenerateJobDescriptionsSchema } from "@src/schemas/jobProfile/jobProfile.schema"
import { JobProfileRepo } from "@src/repos/jobProfile/jobProfile.repo"
import { uploadFile } from "@src/util/upload/doc/uploadDocToCloud"


export class JobProfileController
{
    protected jobProfileService: JobProfileService 

    constructor( )
    {
        const jobProfileRepo = new JobProfileRepo() 
        this.jobProfileService = new JobProfileService( jobProfileRepo )
    }

    // Add a new Job Profile To a User's Job Profiles 
    async create(
        req: Request<{},{},CreateJobProfileSchema['body']>, 
        res: Response 
    )
    {
        try 
        {

            // Data 
            const userId = req.user?._id 
            const userLogContext = req.context 
            const  { jobRole, experienceLevel }  = req.body  

            if( !req.file ){ return res.status(400).json({ success: false, msg:"Please Input a Valid Resume "})}

            /** Ensure User Context Exists */
            if( !userLogContext  || !userId )
            {
                logger.warn(`Request Context Missing for User: ${ userId }`)
                return res.status(500).json({ success: false, msg: "Server Error"})
            }

            /** Create Child Logger */
            const childLogger = logger.child( userLogContext )

            // Upload User Resume 
            const { public_id, url } = await uploadFile( req.file?.path, childLogger ) 

            // Save User Job Profile 
            const jobProfileDoc = { jobRole, experienceLevel, resumeUrl: url, resumeId: public_id }

            // Check if User has not created a job profile before 
            const userHasCreatedJobProfileBefore = req.user?.userHasCreatedFirstJobProfile  

            if( userHasCreatedJobProfileBefore )
            {
                // Adds Job profile to user job profiles 
                childLogger.debug(`User ${ userId } has Job profile. Adding new job profile to user job profiles `)
                await this.jobProfileService.addNewJobProfileToJobProfiles(userId, jobProfileDoc, childLogger) 
            }
            else 
            {
                // Creates New Job Profile For User and adds a Job Profile Entry to User Job Profiles 
                childLogger.debug(`User ${ userId } does not have an existing Job Profile. Creating new Job profile and adding new JobProfileEntry `)
                await this.jobProfileService.createNewJobProfile( userId, jobProfileDoc, childLogger) 
            }
 
            return res.status(201).json({ success: true, msg:"Job Profile Created" })
        }
        catch(err: any)
        {
            const e = err as AnyAppError 

            if( !e.statusCode )
                {
                    logger.error(e,"Unkown_Server_Error")
                    return res.status(500).json({ success: false, msg:"Server Error" })
                }
                console.dir(e ) 
            return res.status( e.statusCode ).json({ success: false, msg: e.message })
        }
    }

    
    async getUserJobProfiles(req: Request, res: Response )
    {
        try 
        {

            // Data 
            const userId = req.user?._id 
            const userLogContext = req.context

            if( !userLogContext ) return res.status(500).json({ success: false, msg:"Server Error "})

            // User Logger 
            const childLogger = logger.child(userLogContext)


            if( !userId ) return res.status(500).json({ success: false, msg:"Server Error "})
            const userJobProfiles = await this.jobProfileService.getUserJobProfiles( userId, childLogger )
            

            // User Does'nt Have any Job Profile Entries 
            if( userJobProfiles === null ) return res.status(200).json({ success: true, data:{ userJobProfiles } })
            
            // Return User Job profiles, from User Job Profile 
            if( userJobProfiles ) return res.status(200).json({success: true, data:{ userJobProfiles }} )

            // User Profile Not Found
            return res.status(404).json({ success: true, msg:`User Has Not Created Any Job Profile Yet `})
        }
        catch(e: any )
        {
            return res.status(500).json({ success: false, msg: e.message })
        }
    }


    async generateJobDescriptions(req: Request<{},{},GenerateJobDescriptionsSchema['body']>, res: Response )
    {
        try 
        {
            const userJobProfile = req.body 
            const generatedJobDescriptions = await this.jobProfileService.generateJobDescriptions( userJobProfile )
            return res.status(200).json({ success: true, data:{ generatedJobDescriptions }})
        }
        catch(err: any)
        {
            const e = err as AnyAppError

            if( !e.statusCode ) return res.status(500).json({ success: false, msg:"Server Error" })

                return res.status(e.statusCode).json({ success: false, msg: e.message })
        }
    }


    async deleteJobProfileFromJobProfiles( req: Request< DeleteJobProfileSchema['params']>, res: Response )
    {
        try 
        {
            const userId = req.user?._id 
            const jobProfileId = req.params.id 
            const userLogContext = req.context 


            if( !userLogContext ) return res.status(500).json({success: false, msg:"Server Error"})
            if( !userId || !jobProfileId ) return res.status( 400 ).json({ success: false, msg:"Job Profile Id not in request params"})


            const childLogger = logger.child(userLogContext) 
            await this.jobProfileService.deleteJobProfileEntry( userId, jobProfileId, childLogger) 

            return res.status(200).json({ success: true, msg:"Job Profile deleted successfully"})
        }
        catch(err: any)
        {
            const e = err as AnyAppError 

            if( !e.statusCode ) return res.status(500).json({ success: false, msg:"Server Error"})
            
            return res.status( e.statusCode ).json({ success: false, msg: e.message } )
        }
    }
}