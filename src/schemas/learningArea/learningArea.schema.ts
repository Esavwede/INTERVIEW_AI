

import { z } from "zod"



export const CreateLearningAreaValidationSchema = z.object 
            (
                {
                    body: z.object
                            (
                                {
                                    area: z.string().min(1,'Input a Learning Area Name') 
                                }
                            )
                }
            )

export const DeleteLearningAreaValidationSchema = z.object 
            (
                {
                    params: z.object
                            (
                                {
                                    id: z.string().min(1,'Input a Learning Area ID') 
                                }
                            )
                }
            )


export type CreateLearningAreaSchema = z.infer<typeof CreateLearningAreaValidationSchema> 
export type DeleteLearningAreaSchema = z.infer<typeof DeleteLearningAreaValidationSchema> 