
import { IGetQuizDTO_Res, IQuizDTO_Req, IUpdateQuiz_Req } from "@src/DTOs/quiz/quiz.dto";
import { IQuiz, Quiz } from "@src/models/Quiz";
import logger from "@src/system/logger/logger";




export class QuizRepo 
{


    constructor()
    {

    }


    async create(  quiz: IQuizDTO_Req ): Promise< boolean > 
    {
        try 
        {
            const newQuiz = await Quiz.create( quiz )

            if( !newQuiz )
            {
                return false 
            }

            return true 
        }
        catch(e: any )
        {
            logger.error(e,'REPO ERROR: COULD NOT CREATE QUIZ')
            return false 
        }
    }

    
    async find( _id: string ): Promise< { } | null > 
    {
            var quiz = await Quiz.findById(_id).populate('questions').select('_id description title questions moduleId modulePartNumber').lean() 

            logger.debug( quiz ) 
            return quiz
    }

    async update( _id: string, updateBody: IUpdateQuiz_Req ): Promise< number > 
    {

        logger.info("QUIZ_REPO: UPDATING QUIZ")
        const result = await Quiz.updateOne({ _id }, updateBody,{ rawResult: true } ).lean() 

        logger.info( result )
        return result.matchedCount 
    }

    async delete( _id: string ): Promise<number>
    {
        const { deletedCount } = await Quiz.deleteOne({ _id })
        return deletedCount
    }



}