
import { IQuizDTO_Req, IUpdateQuiz_Req } from "@src/DTOs/quiz/quiz.dto";
import { Quiz } from "@src/models/Quiz";
import logger from "@src/system/logger/logger";




export class QuizRepo 
{


    constructor()
    {

    }

    async create(  quiz: IQuizDTO_Req ): Promise< void > 
    {
            await Quiz.create( quiz )
    }
    
    async find( _id: string ): Promise< { } | null > 
    {
            var quiz = await Quiz.findById(_id).populate({ path: 'questions', select:'_id text options' }).select('_id description title questions moduleId modulePartNumber').lean() 
            return quiz
    }

    async update( _id: string, updateBody: IUpdateQuiz_Req ): Promise< number > 
    {
        const { modifiedCount } = await Quiz.updateOne({ _id }, updateBody,{ rawResult: true } ).lean() 
        return modifiedCount
    }

    async delete( _id: string ): Promise<number>
    {
        const { deletedCount } = await Quiz.deleteOne({ _id })
        return deletedCount
    }

}