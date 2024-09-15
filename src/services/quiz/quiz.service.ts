import { IGetQuizDTO_Res, IQuizDTO_Req, IUpdateQuiz_Req } from "@src/DTOs/quiz/quiz.dto";
import { QuizRepo } from "@src/repos/quiz/quiz.repo";
import logger from "@src/system/logger/logger";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";


export class QuizSservice 
{

    constructor( private quizRepo: QuizRepo )
    {

    }


    async create( quiz: IQuizDTO_Req): Promise<boolean> 
    {
        const quizCreated = await this.quizRepo.create( quiz )     
        
        if( !quizCreated )
        {
            return false 
        }

        logger.info("Quiz Created") 
        return true 
    }


    async find( quizID: string ) 
    {
        try 
        {
            const quiz = await this.quizRepo.find( quizID ) 

            if( !quiz ) 
            {
                 throw new NotFoundError(`COULD NOT FIND QUIZ WITH ID ${ quizID }`)
            }

            return quiz 
        }
        catch(e: any )
        {
            logger.error(e,`DATABASE ERROR: ERROR WHILE FINDING QUIZ WITH ID: ${   quizID }`)
            throw new ServerError("SERVER ENCOUNTED ERROR WHILE FINDING QUIZ")
        }
    }

    async update( quizID: string, updateBody: IUpdateQuiz_Req )
    {
        try 
        {
            const updatedQuiz = await this.quizRepo.update( quizID, updateBody )

            logger.info("Updated Quiz Result")
            logger.info( updatedQuiz ) 

            if(  updatedQuiz !== 1 )
            {
                logger.error("COULD NOT FIND QUIZ TO UPDATE")
                throw new NotFoundError(`QUIZ_UPDATE_ERROR: Did Not Find Quiz With ID: ${ quizID } for Update `)
            }
        }
        catch(e: any )
        {
            throw new ServerError(`SERVER_ERROR: ERROR OCCURED WHILE UPDATING QUIZ WITH ID: ${ quizID }`)
        }
    }


    async delete( quizID: string )
    {
        try 
        {
            const deletedCount = await this.quizRepo.delete( quizID ) 
            return deletedCount 

        }
        catch(e: any )
        {
            throw new ServerError(`SERVER_ERROR: ERROR OCCURED WHILE DELETING QUIZ WITH ID ${ quizID }`)
        }
    }
    
}