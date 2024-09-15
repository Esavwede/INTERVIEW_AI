

import  { z } from "zod"




            export const LearningModuleOverviewSchema = z.object
                    (
                        {
                            moduleId: z.string().min(1,'Input Learning Module Id'),
                            stage: z.string().min(1,'Input Learning Module Overview Stage'),
                            title: z.string().min(1,'Input Learnng Module Summary Title'),
                            description: z.string().min(1,"Input Learning Module Description"), 
                            imgSrc: z.string().min(1,"Input Learning Module Overview image Url"),
                        }
                    )

            export const OnboardingValidationSchema = z.object
            (
                {
                    body: z.object
                            (
                                {
                                    learningModules: z.array( LearningModuleOverviewSchema )
                                }
                            )
                }
            )          


export type OnboardingSchema = z.infer<typeof OnboardingValidationSchema> 