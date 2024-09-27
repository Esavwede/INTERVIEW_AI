

import mongoose, { Document, ObjectId, Schema } from "mongoose"
import { title } from "process"

export interface IPartContent 
{
    _id: ObjectId,
    type: string, 
    value: string 
}

export const PartContentSchema = new Schema<IPartContent>
                (
                    {
                        type: 
                        {
                            type: String, 
                            required: true 
                        },
                        value:
                        {
                            type: String, 
                            required: true 
                        }
                    }
                )


export interface ILearningModulePart extends Document 
{
    title: string, 
    learningModuleId?: ObjectId, 
    quizId?: ObjectId,
    content: IPartContent[],
    isLast: boolean 
}


const LearningModulePartSchema = new Schema<ILearningModulePart> 
        (
            {
                title: 
                {
                    type: String, 
                    required: true 
                },
                learningModuleId: 
                {
                    type: mongoose.Types.ObjectId
                },
                quizId: 
                {
                    type: String,
                    default: '' 
                },
                content: 
                {
                    type: [ PartContentSchema ], 
                    required: true 
                },
                isLast:
                {
                    type: Boolean, 
                    require: true, 
                    default: false 
                }
            }
        )


export interface IPartMetaData 
{
    title: string, 
    hasBeenCompleted: boolean 
}

export const PartMetaDataSchema  = new Schema
    (
        {
            title: 
            {
                type: String, 
                required: true 
            },
            hasBeenCompleted: 
            {
                type: Boolean, 
                required: true,
                default: false 
            }
        }
    )

export interface ILearningModule extends Document 
{
    title: string, 
    area: ObjectId, 
    stage: ObjectId,
    stageName: string,
    stageNumber: number, 
    description: string, 
    imgSrc: string,
    totalParts: number, 
    partsMetaData: IPartMetaData[], 
    parts?: ILearningModulePart[], 
    isDraft: boolean 
}


const LearningModuleSchema = new Schema<ILearningModule>
        ( 
            {
                title:
                {
                    type: String, 
                    required: true, 
                    unique: true 
                },
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
                description: 
                {
                    type: String, 
                    required: true    
                },
                imgSrc: 
                {
                    type: String, 
                    required: true
                },
                totalParts:
                {
                    type: Number, 
                    required: true, 
                    default: 0
                },
                partsMetaData: 
                {
                    type: [PartMetaDataSchema]
                },
                parts:
                {
                    type: [LearningModulePartSchema]
                },
                isDraft:
                {
                    type: Boolean, 
                    required: true, 
                }
            },
            {
                timestamps: true 
            }
        )



export const LearningModule = mongoose.model('learningModule', LearningModuleSchema ) 