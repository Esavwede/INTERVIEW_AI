

import JobProfile, { IJobProfileEntry } from "@src/models/JobProfile";
import logger from "@src/system/logger/logger";
import { Logger } from "pino";



export class JobProfileRepo 
{
    
    constructor() 
    {
        
    }

    
    /** Creates A new Job Profile For a User, and adds an Entry to the "jobProfiles" Fields */
    async create
    ( 
        userId: string, 
        jobProfileDoc: Pick< IJobProfileEntry, 'jobRole' | 'experienceLevel' | 'resumeUrl' | 'resumeId' >,
        childLogger: Logger
        
    ): Promise<void> 
    {
        const doc = { userId, jobProfiles: jobProfileDoc }
        await JobProfile.create( doc )
        
        childLogger.debug("JOB_PROFILE_REPO: Job Profile Created")
    }


    /** Adds a new Job Profile To the User Job Profiles  */
    async addNew
    (
        userId: string, 
        jobProfileDoc: Pick< IJobProfileEntry, 'jobRole' | 'experienceLevel' | 'resumeUrl' | 'resumeId' >,
        childLogger: Logger

    ): Promise<number> 
    {
        const { modifiedCount } = await JobProfile.updateOne({ userId },{ $push: { jobProfiles: jobProfileDoc }})   

        childLogger.debug("JOB_PROFILE_REPO: ADDED NEW JOB PROFILE TO USER JOB PROFILES")
        return modifiedCount 
    }


    /** Gets A user's Job profiles */
    async getUserJobProfiles
    ( 
        userId: string 

    ): Promise<  Pick<IJobProfileEntry,  'jobRole' | 'experienceLevel' | 'resumeUrl'  | 'resumeId'>[] | void |  null >
    {
        const result = await JobProfile.findOne({ userId }).select("jobProfiles").lean() 
        
        if( !result ) return // 404 

        if( result.jobProfiles.length === 0 ) return null 

        return result.jobProfiles 
    }   


    /** Updates A User's Job Profile */
    async updateJobProfileEntry
    (
         userId: string,
         updateDoc: Pick< IJobProfileEntry, 'resumeUrl' | 'resumeId' | 'experienceLevel'  | 'jobRole' >
    )
    {

    }


    async deleteProfileFromProfiles( userId: string, jobProfileId: string ): Promise<number> 
    {
        const { modifiedCount } = await JobProfile.updateOne({ userId },{$pull:{ jobProfiles:{ _id: jobProfileId }}})
        return modifiedCount
    }

    
}