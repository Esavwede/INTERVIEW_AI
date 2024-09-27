


import { z, TypeOf } from "zod"


export const LearningModuleOverviewSchema2 = z.object
                    (
                        {
                            _id: z.string
                            (
                                {
                                    required_error: "Module Id Not In Request",
                                    invalid_type_error: "Module Id Must Be of Type String",
                                }
                            )
                            .min(1,'Invalid Length For Module Id'),

                            area: z.string
                            (
                                {
                                    required_error: "Learning Area Not Found In Request",
                                    invalid_type_error: "Learning Area Must Be of Type String",
                                }
                            )
                            .min(2,"Learning Area Length Cannot Be less than 2"),

                            stage: z.string
                            (
                                {
                                    required_error: "Stage not Found In Request Body",
                                    invalid_type_error: "Stage Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Length Cannot Be less Than 1'),
                            stageName: z.string
                            (
                                {
                                    required_error: "StageName not Found In Request Body",
                                    invalid_type_error: "StageName Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Name Length Cannot Be less Than 1'),
                            stageNumber: z.number
                            (
                                {
                                    required_error: "StageNumber not Found In Request Body",
                                    invalid_type_error: "StageNumber Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Number Cannot Be less Than 1'),

                            title: z.string
                            (
                                {
                                    required_error: "Title not Found In Request Body",
                                    invalid_type_error: "Title Must Be Of Type String",
                                }
                            )
                            .min(1,'Title Length Cannot Be less than 1'),

                            description: z.string
                            (
                                {
                                    required_error: "Description not Found In Request Body",
                                    invalid_type_error: "User Id Incorrect. Must be type: string",
                                }
                            )
                            .min(1,"Description Length Cannot Be less than 1"), 

                            imgSrc: z.string
                            (
                                {
                                    required_error: "imgSrc not Found In Request Body",
                                    invalid_type_error: "imgSrc Must Be A String",
                                }
                            )
                            .min(1,"imgSrc Length Cannot be less than 1"),

                            totalParts: z.number
                            (
                                {
                                    required_error: "totalParts not Found In Request Body",
                                    invalid_type_error: "total Parts must be type: number",
                                }
                            ),
                            partsMetaData: z.array
                            (
                                    z.object
                                (
                                    {
                                            title: z.string({ required_error:"part title not found", invalid_type_error:"must be string"}),
                                            hasBeenCompleted: z.boolean()
                                    }
                                )
                            )
                        }
                    )
                    

export const LearningModuleOverviewSchema = z.object
                    (
                        {
                            _id: z.string
                            (
                                {
                                    required_error: "Module Id Not In Request",
                                    invalid_type_error: "Module Id Must Be of Type String",
                                }
                            )
                            .min(1,'Invalid Length For Module Id'),

                            area: z.string
                            (
                                {
                                    required_error: "Learning Area Not Found In Request",
                                    invalid_type_error: "Learning Area Must Be of Type String",
                                }
                            )
                            .min(2,"Learning Area Length Cannot Be less than 2"),

                            stage: z.string
                            (
                                {
                                    required_error: "Stage not Found In Request Body",
                                    invalid_type_error: "Stage Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Length Cannot Be less Than 1'),
                            stageName: z.string
                            (
                                {
                                    required_error: "StageName not Found In Request Body",
                                    invalid_type_error: "StageName Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Name Length Cannot Be less Than 1'),
                            stageNumber: z.number
                            (
                                {
                                    required_error: "StageNumber not Found In Request Body",
                                    invalid_type_error: "StageNumber Must Be Of Type String",
                                }
                            )
                            .min(1,'Stage Number Cannot Be less Than 1'),

                            title: z.string
                            (
                                {
                                    required_error: "Title not Found In Request Body",
                                    invalid_type_error: "Title Must Be Of Type String",
                                }
                            )
                            .min(1,'Title Length Cannot Be less than 1'),

                            description: z.string
                            (
                                {
                                    required_error: "Description not Found In Request Body",
                                    invalid_type_error: "User Id Incorrect. Must be type: string",
                                }
                            )
                            .min(1,"Description Length Cannot Be less than 1"), 

                            imgSrc: z.string
                            (
                                {
                                    required_error: "imgSrc not Found In Request Body",
                                    invalid_type_error: "imgSrc Must Be A String",
                                }
                            )
                            .min(1,"imgSrc Length Cannot be less than 1"),

                            totalParts: z.number
                            (
                                {
                                    required_error: "totalParts not Found In Request Body",
                                    invalid_type_error: "total Parts must be type: number",
                                }
                            )
                        }
                    )
                    

export const CreateLearningModuleSchema = z.object
            (
                {
                    body: z.object
                    (
                        {
                            title: z.string().min(1,'Please Input Title'),
                            area: z.string().min(1,'Please Input Knowledge Area'),
                            stage: z.string().min(1,'Please Input Stage'),
                            stageName: z.string().min(1,"stage Id cannot be less than 1"),
                            stageNumber: z.number().int(),
                            description: z.string().min(1,'Please Input Description'),
                            imgSrc: z.string().url("Please input Valid Url"),
                            isDraft: z.boolean() 
                        }
                    )
                }
            )   


            export const PublishLearningModuleValidationSchema = z.object
            (
                {
                    body: z.object
                    (
                        {
                            title: z.string().min(1,'Please Input Title'),
                            area: z.string().min(1,'Please Input Knowledge Area'),
                            stage: z.string().min(1,'Please Input Stage'),
                            stageName: z.string().min(1,"stage Id cannot be less than 1"),
                            stageNumber: z.number().int(),
                            description: z.string().min(1,'Please Input Description'),
                            imgSrc: z.string().url("Please input Valid Url"),
                            totalParts: z.number(), 
                            isDraft: z.boolean().refine(val => val === false, {
                                message: "isDraft must be false",
                              })
                        }
                    ),
                    params: z.object
                        (
                            {
                                id: z.string().min(5,'Invalid id Length')
                            }
                        )
                }
            )   


export const GetLearningModuleSchema = z.object 
        (
            {
                params: z.object
                (
                    {
                        id: z.string().min(1,'Please Input Learning Module Id')
                    }
                )
            }
        )

export const UpdateLearningModuleSchema = z.object
        (
            {
                body: z.object 
                (
                    {
                        title: z.string().min(1,'check title length').optional(),
                        area: z.string().min(1,'check title length').optional(),
                        stage:z.string().min(1,'check title length').optional(),
                        stageName: z.string().min(2,"stage name length cannot be less than 2").optional(),
                        stageNumber: z.number().min(2,"stage number length cannot be less than 2").optional(),
                        description: z.string().min(1,'check title length').optional(),
                        imgSrc: z.string().min(1,'check title length').optional()    
                    }
                ),
                params: z.object
                (
                    {
                        id: z.string().min(1,'Input Params "ObjectId"')
                    }
                )
            }
        )


export const DeleteLearningModuleSchema = z.object 
                (
                    {
                        params: z.object
                                (
                                    {
                                        id: z.string().min(1,'INPUT LEARNING MODULE ID') 
                                    }
                                )
                    }
                )

/** Saves the Summary Of A newly added learning module to the user profile  */                    
export const SaveLearningModuleSummaryValidationSchema = z.object
                    (
                        {
                            body: z.object
                                    (
                                        {
                                            learningModules: z.array( LearningModuleOverviewSchema2 )
                                        }
                                    )
                        }
                    )          

export const GetLearningModulePartValidationSchema = z.object  
                        (
                            {
                              
                                   query: z.object
                                    (
                                        {
                                            totalParts: z.string({ required_error:" totalParts not found in request body", invalid_type_error:"totalParts must be of type number"})
                                        }
                                    ),
                                    params: z.object
                                    (
                                        {
                                            moduleId: z.string().min(1,'Learning Module Id length cannot be less than 1 '),
                                            partNumber: z.string({ required_error:"partNumber is required", invalid_type_error:"partNumber must be of type Number"})
                                        }
                                    )
                            }
                        )

export const GetLearningModulesUnderStageValidationSchema = z.object
                                                            (
                                                                {
                                                
                                                                    query: z.object
                                                                    (
                                                                        {
                                                                            page: z.string
                                                                                    (
                                                                                        { 
                                                                                            required_error:"page must be include in request query"
                                                                                        }
                                                                                    )
                                                                                    .min(1,'page not included in request query'),

                                                                            limit: z.string 
                                                                                    (
                                                                                        {
                                                                                            required_error:"limit must be included in request query" 
                                                                                        }
                                                                                    )
                                                                                    .min(1,'limit must be included in request query '),
                                                                            stageNumber: z.string
                                                                                    (
                                                                                        {
                                                                                            required_error:"stageNumber must be included in request params", 
                                                                                            invalid_type_error:"stageNumber must be of type string" 
                                                                                        }
                                                                                    )
                                                                        }
                                                                    )
                                                                }
                                                            )


export type GetLearningModulePartSchema = z.infer<typeof GetLearningModulePartValidationSchema> 
export type CreateLearningModuleSchema = z.infer<typeof CreateLearningModuleSchema>
export type UpdateLearningModuleInput = TypeOf<typeof UpdateLearningModuleSchema>
export type DeleteLearningModule = TypeOf<typeof DeleteLearningModuleSchema> 
export type SaveLearningModuleOverviewSchema = z.infer<typeof SaveLearningModuleSummaryValidationSchema> 
export type PublishLearningModuleSchema = z.infer<typeof PublishLearningModuleValidationSchema> 
export type GetLearningModulesUnderStageSchema = z.infer<typeof GetLearningModulesUnderStageValidationSchema>