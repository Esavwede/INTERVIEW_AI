
import mongoose from "mongoose";
import { z } from "zod"


const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB 
const ACCEPTED_FILE_TYPES = [
                                'image/png',
                                'application/pdf',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'text/plain'
                            ]

export const CreateJobProfileValidationSchema = z.object
                                            (
                                                {
                                                    body: z.object
                                                            (
                                                                {
                                                                    jobRole: 
                                                                        z.string
                                                                                (
                                                                                    {
                                                                                        required_error: "JOB ROLE FIELD NOT IN REQUEST BODY",
                                                                                        invalid_type_error:"JOB ROLE VALUE MUST BE OF TYPE STRING"
                                                                                    }
                                                                                )
                                                                    ,

                                                                    experienceLevel:
                                                                        z.string   
                                                                                (
                                                                                    {
                                                                                        required_error: "EXPERIENCE LEVEL FIELD NOT IN REQUEST BODY",
                                                                                        invalid_type_error: "EXPERIENCE LEVEL VALUE MUST BE OF TYPE STRING"
                                                                                    }
                                                                                )

                                                                }
                                                            )
                                                }
                                            )


export const DeleteJobProfileValidationSchema = z.object   
                                            (
                                                {
                                                    params: z.object(
                                                        {
                                                            id: z.string()
                                                                .refine(( value )=> mongoose.Types.ObjectId.isValid(value) ,{ message:"Not a valid object Id"})
                                                        }
                                                    )
                                                }
                                            )


export const GenerateJobDescriptionsValidationSchema = z.object
                                                            (
                                                                {
                                                                    body: z.object
                                                                            (
                                                                                {
                                                                                       jobRole: z.string
                                                                                        (
                                                                                            {
                                                                                                required_error: "jobRole required",
                                                                                                invalid_type_error: "jobRole must be of type string"
                                                                                            }
                                                                                        ),
                                                                                        experienceLevel: z.string
                                                                                        (
                                                                                            {
                                                                                                required_error: "experienceLevel required",
                                                                                                invalid_type_error:"experience level must be of type string"
                                                                                            }
                                                                                        ),
                                                                                        resumeUrl: z.string
                                                                                        (
                                                                                            {
                                                                                                required_error: "resumeUrl Required",
                                                                                                invalid_type_error:"resumeUrl must be of type string"
                                                                                            }
                                                                                        ),

                                                                                }
                                                                            )
                                                                }
                                                            )


export type CreateJobProfileSchema = z.infer<typeof CreateJobProfileValidationSchema>
export type DeleteJobProfileSchema = z.infer<typeof DeleteJobProfileValidationSchema>  
export type GenerateJobDescriptionsSchema = z.infer<typeof GenerateJobDescriptionsValidationSchema>