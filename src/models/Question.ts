
import mongoose, { Document, Schema, ObjectId } from "mongoose";


// Option Interface 
interface IOption
{
    char: string, 
    value: string 
}

//Option Schema 
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


// Quiz Question Interface 
export interface IQuestion extends Document 
{
    area: ObjectId,
    stage: ObjectId,
    text: string,
    options: IOption[],
    answer: IOption
}



// Quiz Question Schema 
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
