
import mongoose, { Document, Schema, Types } from "mongoose";


export interface ILearningModuleUnderArea extends Document 
{
    learningModuleId: Types.ObjectId | string, 
    stage: string,
    stageNumber: number,
    stageName: string, 
    title: string,
    area?: string, 
    totalParts: number, 
    imgSrc: string, 
    description: string 
}


const LearningModuleUnderAreaSchema = new Schema<ILearningModuleUnderArea> 
            (
                {
                    learningModuleId: 
                    {
                        type: Schema.Types.ObjectId, 
                        required: true 
                    },
                    stage: 
                    {
                        type: String, 
                        required: true 
                    },
                    stageName:
                    {
                        type: String, 
                        required: true 
                    },
                    stageNumber:
                    {
                        type: Number,
                        required: true 
                    },
                    title: 
                    {
                        type: String, 
                        required: true
                    },
                    area:
                    {
                        type: String 
                    },
                    totalParts:
                    {
                        type: Number, 
                        required: true, 
                        default: 0 
                    },
                    imgSrc:
                    {
                        type: String, 
                        required: true 
                    },
                    description: 
                    {
                        type: String, 
                        required: true 
                    }
                }
            )


export interface ILearningArea extends Document
{
    area: string, 
    learningModulesUnderArea: ILearningModuleUnderArea[] 
}



const LearningAreaSchema = new Schema<ILearningArea> 
            (
                {
                    area: 
                    {
                        type: String, 
                        required: true, 
                        unique: true 
                    },
                    learningModulesUnderArea: 
                    {
                        type: [LearningModuleUnderAreaSchema]
                    }

                }
            )



export const LearningArea = mongoose.model<ILearningArea>("learningArea", LearningAreaSchema )
