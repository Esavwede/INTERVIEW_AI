import { IQuestionDTO_Req, IQuestionDTO_Res } from "@src/DTOs/question/question.dto";
import { QuestionRepo } from "@src/repos/question/question.repo";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";
import logger from "@src/system/logger/logger";


export class QuestionService 
{
    constructor( private questionRepository: QuestionRepo )
    {
        
    }


    async create( questions: IQuestionDTO_Req[] ): Promise< string[] > 
    {
        try 
        {

            const createdQuestions = await this.questionRepository.create( questions )

            var questionIds: string[] = [] 
    
            createdQuestions.forEach( question => {
                questionIds.push( question.id ) 
            });

            return questionIds 
        }
        catch(e: any )
        {
            logger.error(e,"SERVICE: ERROR OCCURED WHILE ADDING QUIZ QUESTIONS")
            throw new ServerError("ERROR OCCURED WHILE CREATING QUIZ")
        }
    }
    
}

