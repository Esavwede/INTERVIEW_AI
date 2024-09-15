

import { z, TypeOf} from "zod"


const OptionSchema = z.object 
        (
            {
                char: z.string().min(1,'ENTER OPTION LETTER').max(1,'OPTION LETTER LENGTH CANNOT BE GREATER THAN ONE'),
                value: z.string().min(1, 'ENTER OPTION TEXT')
            }
        )

const QuestionsSchema = z.object
            (
                {
                            text: z.string().min(1,'INPUT QUESTION TEXT'),
                            area: z.string().min(1,'INPUT QUESTION AREA'), 
                            stage: z.string().min(1,'INPUT QUESTION AREA'), 
                            options: z.array( OptionSchema ),
                            answer: OptionSchema 
                }
            )


export const CreateQuestionsValidationSchema = z.array( QuestionsSchema )



export type CreateQuestion = TypeOf<typeof CreateQuestionsValidationSchema> 