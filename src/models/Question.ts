
import mongoose, { Document, Schema, ObjectId } from "mongoose";




interface IOption
{
    char: string, 
    value: string 
}

const OptionSchema = new Schema<IOption>
    (
        {
            char: 
            {
                type: String,
                required: true,
                maxlength: 1 
            },
            value:
            {
                type: String, 
                required: true
            }
        }
    )




export interface IQuestion extends Document 
{
    area: ObjectId,
    stage: ObjectId,
    text: string,
    options: IOption[],
    answer: IOption
}


const QuestionSchema = new Schema<IQuestion> 
            (
                {
                    area: 
                    {
                        type: mongoose.Types.ObjectId, 
                        required: true
                    },
                    stage:
                    {
                        type: mongoose.Types.ObjectId, 
                        required: true 
                    },
                    text: 
                    {
                        type: String, 
                        required: true
                    },
                    options:
                    {
                        type: [OptionSchema],
                        required: true 
                    },
                    answer: 
                    {
                        type: OptionSchema, 
                        required: true 
                    }
                },
                {
                    timestamps: true 
                }
            )






export const Question = mongoose.model<IQuestion>('Question', QuestionSchema )
