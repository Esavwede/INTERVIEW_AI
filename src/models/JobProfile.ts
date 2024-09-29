
import mongoose, { Schema, Types, Document } from "mongoose" 


/** Generated Job Role Interface */
export interface IGeneratedJobRole 
{
    roleContent: string 
}

const GeneratedJobRoleSchema = new Schema<IGeneratedJobRole>
                                        (
                                            {
                                                roleContent: 
                                                {
                                                    type: String, 
                                                    required: true 
                                                }
                                            }
                                        )
                                

/** Job Profile Item Interface */
export interface IJobProfileEntry extends Document 
{
    jobRole: string, 
    experienceLevel: string, 
    resumeUrl: string, 
    resumeId: string 
}

/** Job Profile Item Schema */
const JobProfileEntrySchema = new Schema<IJobProfileEntry>
                                (
                                    {
                                        jobRole:
                                        {
                                            type: String, 
                                            required: true
                                        },
                                        experienceLevel: 
                                        {
                                            type: String, 
                                            required: true 
                                        },
                                        resumeUrl:
                                        {
                                            type: String, 
                                            required: true 
                                        },
                                        resumeId:
                                        {
                                            type: String, 
                                            required: true 
                                        }
                                    }
                                )

/** Job Profile Interface  */
export interface IJobProfile extends Document 
{
    userId: Types.ObjectId | string,
    jobProfiles: IJobProfileEntry[], 
    generatedJobRoles: IGeneratedJobRole[] 
}


/** Job Profile Schema */
const JobProfileSchema = new Schema<IJobProfile>
                            (
                                {
                                    userId: 
                                    {
                                        type: Schema.Types.ObjectId, 
                                        required: true,
                                        unique: true 
                                    },
                                    jobProfiles:
                                    {
                                        type: [JobProfileEntrySchema] 
                                    },
                                    generatedJobRoles:
                                    {
                                        type: [GeneratedJobRoleSchema]
                                    }
                                }
                            )


const JobProfile = mongoose.model("jobProfile", JobProfileSchema ) 
export default JobProfile 