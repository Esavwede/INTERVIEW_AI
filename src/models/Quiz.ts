
import mongoose,{ Document, Types,  Schema, ObjectId } from "mongoose";



export interface IQuiz extends Document 
{
    title: string, 
    description: string,
    moduleId: ObjectId, 
    modulePartNumber: number, 
    questions: Types.ObjectId[] 
}




const QuizSchema = new Schema<IQuiz>
                (
                    {
                        title: 
                        {
                            type: String, 
                            required: true 
                        },
                        description:
                        {
                            type: String, 
                            required: true
                        },
                        moduleId:
                        {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        modulePartNumber:
                        {
                            type: Number, 
                            required: true 
                        },
                        questions:
                        {
                            type: [Schema.Types.ObjectId ],
                            required: true, 
                            ref: 'Question' 
                        }
                    }
                )



export const Quiz = mongoose.model<IQuiz>('quiz', QuizSchema ) 
