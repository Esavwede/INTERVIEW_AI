

import mongoose, { Document, ObjectId, Schema } from "mongoose"

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
    learningModuleId?: ObjectId, 
    quizId?: ObjectId,
    content: IPartContent[],
    isLast: boolean 
}


const LearningModulePartSchema = new Schema<ILearningModulePart> 
        (
            {
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


export interface ILearningModule extends Document 
{
    title: string, 
    area: ObjectId, 
    stage: ObjectId, 
    description: string, 
    imgSrc: string,
    totalParts: number, 
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