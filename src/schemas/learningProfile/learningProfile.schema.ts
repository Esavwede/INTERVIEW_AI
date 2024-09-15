
import { z } from "zod" 

const learningModulesOverviewSchema  = z.object 
            (
                {
                    moduleId: z.string().min(1,"ENTER LEARNING MODULE ID"),
                    stage: z.string().min(1,"ENTER LEARNING MODULE STAGE ID"), 
                    title: z.string().min(1,"INPUT LEARNING MODULE TITLE"),
                    description: z.string().min(1,"INPUT LEARNING MODULE DESCRIPTION")
                }
            )


export const CreateLearningProfileValidationSchema = z.object 
            (
                {
                    body: z.object 
                        (
                            {
                                userId: z.string().min(1,"INPUT USER ID FOR LEARNING PROFILE"),
                                learningModules: z.array( learningModulesOverviewSchema ).optional() 
                            }
                        )
                }
            )


export type CreateLearningProfileSchema = z.infer<typeof CreateLearningProfileValidationSchema>