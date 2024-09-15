

import { z, TypeOf} from "zod"
import { CreateQuestionsValidationSchema} from "../question/question.schema"

export const CreateQuizValidationSchema = z.object 
        (
            {
               body: z.object 
               (
                {
                    title: z.string().min(1,'INPUT QUIZ TITLE'), 
                    description: z.string().min(1,'INPUT QUIZ DESCRIPTION'),
                    moduleId: z.string().min(1,'INPUT MODULE ID'), 
                    modulePartNumber: z.number(), 
                    questions: CreateQuestionsValidationSchema
                }
               )
            }
        )


export const FindQuizValidationSchema = z.object 
            (
                {
                    params: z.object
                        (
                            {
                                id: z.string().min(1,'INPUT QUIZ ID')
                            }
                        )
                }
            )


export const UpdateQuizValidationSchema = z.object 
                (
                    {
                        body: z.object 
                            (
                                {
                                    title: z.string().min(1,'INPUT QUIZ TITLE').optional(), 
                                    description: z.string().min(1,'INPUT QUIZ DESCRIPTION').optional(),
                                    moduleId: z.string().min(1,'INPUT MODULE ID').optional(), 
                                    modulePartNumber: z.number().optional(), 
                                    questions: CreateQuestionsValidationSchema.optional() 
                                }
                            ),

                        params: z.object
                             (
                                {
                                    id: z.string().min(1,'INPUT QUIZ ID IN PARAMS')
                                }
                             )
                    }
                )


export const DeleteQuizValidationSchema = z.object
                (
                    {
                        params: z.object
                                (
                                    {
                                        id: z.string().min(1,'INPUT QUIZ ID')
                                    }
                                )
                    }
                )



export type CreateQuizSchema = TypeOf<typeof CreateQuizValidationSchema> 
export type FindQuizSchema   = TypeOf<typeof FindQuizValidationSchema> 
export type UpdateQuizSchema = TypeOf<typeof UpdateQuizValidationSchema> 
export type DeleteQuizSchema = TypeOf<typeof DeleteQuizValidationSchema> 