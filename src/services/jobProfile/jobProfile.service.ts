import { IJobProfileEntry } from "@src/models/JobProfile";
import { JobProfileRepo } from "@src/repos/jobProfile/jobProfile.repo";
import logger from "@src/system/logger/logger";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import { UserService } from "../user/user";
import { UserRepository  } from "@src/repos/user/user.repo";
import { ConflictError } from "@src/util/Errors/Endpoints/conflictError";
import { Logger } from "pino";
import { generateJobDescriptions } from "@src/util/jobDescription/generateJobDescriptions";
import { fetchUserResumeAsText } from "@src/util/jobDescription/fetchUserResume";



export class JobProfileService 
{
    private userService: UserService 

    constructor( private jobProfileRepo: JobProfileRepo )
    {
        const userRepo = new UserRepository() 
        this.userService = new UserService( userRepo )
    }


    async createNewJobProfile
    (
        userId: string, 
        jobProfileDoc: Pick< IJobProfileEntry, 'jobRole' | 'experienceLevel' | 'resumeUrl' | 'resumeId' >,
        childLogger: Logger

    ): Promise<void> 
    {
        try 
        {
            await this.jobProfileRepo.create( userId, jobProfileDoc, childLogger )

            /** Connects To User Service to Update User  */
            await this.userService.markUserHasCreatedFirstJobProfileAsFalse( userId ) 

            childLogger.debug("JOB_PROFILE_SERVICE: NEW JOB PROFILE CREATED FOR USER " + userId )
        }
        catch(e: any )
        {
            if( e?.code === 11000 )
            {
                childLogger.error(e,`User Job Profile Exists In Database`)
                throw new ConflictError("User Job Profile Exists. Add new Job Profile Entry ") 
            }

            childLogger.error(e,`JOB_PROFILE_SERVICE: ERROR OCCURED WHILE CREATING NEW JOB PROFILE FOR USER: ${ userId }`)
            throw new ServerError("Server Encountered Error While Creating Job Profile" )
        }
    }

    async addNewJobProfileToJobProfiles
    (
        userId: string, 
        jobProfileDoc: Pick< IJobProfileEntry, 'jobRole' | 'experienceLevel' | 'resumeUrl' | 'resumeId'>, 
        childLogger: Logger 

    ): Promise<void>
    {
        try 
        {
            const modifiedCount = await this.jobProfileRepo.addNew( userId, jobProfileDoc, childLogger) 

            if( modifiedCount !== 1 )
            {
                logger.debug(`JOB_PROFILE_SERVICE: USER: ${ userId } JOB PROFILE NOT FOUND `)
                throw new NotFoundError(`Job Profile Not Found`)
            }
            
                childLogger.debug(`NEW JOB PROFILE ADDED TO USER: ${ userId } JOB PROFILES `)
        }
        catch(e: any )
        {
            childLogger.error(e,`JOB_PROFILE_SERVICE: COULD NOT ADD NEW JOB PROFILE TO USER: ${ userId } JOB PROFILES `)
            
            if( e instanceof NotFoundError ) throw e 

            throw e 
        }
    }

        // Get User Job Profiles 
    async getUserJobProfiles
        (
            userId: string,
            childLogger: Logger
        )
        {
            try 
            {
                const userJobProfiles = await this.jobProfileRepo.getUserJobProfiles( userId ) 

                childLogger.debug(`Job_Profile_Service:    Received User: ${ userId } job profiles `)
                childLogger.debug( userJobProfiles ) 
                return userJobProfiles
            }
            catch(e: any)
            {
                logger.error(e,`Job_Profile_Service: Could Not Get User Job Profiles`)
                throw new ServerError("Server Error")
            }
    }


    async deleteJobProfileEntry( userId: string, jobProfileId: string, childLogger: Logger )
    {
        try 
        {
            const deleted = await this.jobProfileRepo.deleteProfileFromProfiles( userId, jobProfileId )

            if( !deleted ) throw new NotFoundError(`Did Not Find Job Profile with ID: ${ jobProfileId } for Deletion`)

            logger.debug(`Job Profile: ${ jobProfileId } Deleted from User: ${ userId } learning Profiles `)
        }
        catch(e: any)
        {
            logger.error(e,"error occured while deleting job profile ") 
            throw e 
        }
    }


    async generateJobDescriptions(
        
        userJobProfile: { jobRole: string, experienceLevel: string, resumeUrl: string }
    )
    {
        try 
        {
            const { jobRole, experienceLevel, resumeUrl } = userJobProfile 

            // Fetch User Resume As Text 
            const userResumeText = await fetchUserResumeAsText( resumeUrl )

            // Set Payload to generate Job Descriptions 
            const userJobProfilePayload = { jobRole, experienceLevel, resume: userResumeText }

            // Generated Job Descriptions 
            const generatedJobDescriptions = await generateJobDescriptions( userJobProfilePayload) 

            return generatedJobDescriptions 
        }
        catch(e: any)
        {
            logger.error(e,"Could Not Get Resume Url For User") 
            throw new ServerError("server error") 
        }
    }


}