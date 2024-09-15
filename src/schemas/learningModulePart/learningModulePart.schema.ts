

import { z, TypeOf } from "zod"


const SectionSchema = z.object  
            (
                {
                    type: z.string().min(1,'INPUT SECTION TYPE'),
                    value: z.string().min(1,'INPUT SECTION CONTENT')
                }
            )


            const SectionUpdateSchema = z.object  
            (
                {
                    _id: z.string().min(1,'INPUT SECTION TYPE'),
                    type: z.string().min(1,'INPUT SECTION TYPE'),
                    value: z.string().min(1,'INPUT SECTION CONTENT')
                }
            )


const PartSchema = z.array( SectionSchema )


export const LearningModulePartValidationSchema = z.object 
                (
                    {
                        body: z.object 
                            (
                                {
                                    learningModuleId: z.string().min(1,'INPUT LEARNING MODULE ID'),
                                    content: PartSchema,
                                    isLast: z.boolean({
                                        required_error: "isLast Field Not Present",
                                        invalid_type_error: "Invalid value, expected a boolean (true or false)"
                                    })
                                }
                            )
                    }
                )

                

export const GetLearningModuleValidationSchema = z.object 
                (
                    {
                        params: z.object 
                            (
                                {
                                    moduleId: z.string().min(1,'INPUT LEARNING MODULE ID'),
                                    partNumber: z.string().min(1,'INPUT LEARNING MODULE PART NUMBER') 
                                }
                            )
                    }
                )



export const UpdateLearningModulePartSchema = z.object 
                (
                    {
                        body: z.object
                                (
                                    {
                                        learningModuleId: z.string().min(1,"Input Learning Module ID"),
                                        content: z.array( SectionUpdateSchema )
                                    }
                                )
                    }
                )


export type LearningModulePartSchema_Create = TypeOf<typeof LearningModulePartValidationSchema>  
export type LearningModulePartSchema_Get = z.infer<typeof GetLearningModuleValidationSchema> 
export type LearningModulePartSchema_Update = z.infer<typeof UpdateLearningModulePartSchema> 