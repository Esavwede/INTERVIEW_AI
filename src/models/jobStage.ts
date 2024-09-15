

import mongoose, { Document, Schema } from "mongoose";


export interface IStage extends Document
{
    name: string,
    number: number 
}


const StageSchema = new Schema<IStage> 
            (
                {
                    name: 
                    {
                        type: String, 
                        required: true,
                        unique: true 
                    },
                    number: 
                    {
                        type: Number, 
                        required: true,
                        unique: true 
                    }
                }
            )


export const Stage = mongoose.model<IStage>("learningArea", StageSchema )
