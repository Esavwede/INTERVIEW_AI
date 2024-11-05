

import mongoose, { Document, Schema, Types } from "mongoose";


export interface IStage extends Document
{
    _id: Types.ObjectId | string,
    name: string,
    number: number 
}


const StageSchema = new Schema<IStage> 
            (
                {
                    _id: 
                    {
                        type: Schema.Types.ObjectId, 
                        required: true 
                    },
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
