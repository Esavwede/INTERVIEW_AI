

import { Question } from "@src/models/Question";
import { IQuestion } from "@src/models/Question";
import { IQuestionDTO_Req, IQuestionDTO_Res } from "@src/DTOs/question/question.dto";


export class QuestionRepo 
{

    constructor()
    {

    }

    async create( questions: IQuestionDTO_Req[] ): Promise< IQuestion[] > 
    {
            const createdQuestions = await Question.create( questions ) 
            return createdQuestions
    }   

    
}