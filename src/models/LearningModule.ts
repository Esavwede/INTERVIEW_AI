

import mongoose, { Document, ObjectId, Schema, Types } from "mongoose"
import { ILearningModulePart, IPartMetaData, LearningModulePartSchema, PartMetaDataSchema } from "./learningModulePart"

 
// Learning Module Overview Interface 
export interface ILearningModuleOverview extends Document 
{
    _id: Types.ObjectId | string, 
    area: string, 
    stage: ObjectId | string, 
    stageName: string,
    stageNumber: number,
    title: string,
    description: string,
    imgSrc: string,
    partsMetaData: IPartMetaData[] 
    totalParts: number, 
    currentPart: number,
    nextPart: number 
}


// Learning Module Overview Schema 
export const LearningModuleOverviewSchema = new Schema<ILearningModuleOverview>
        (
            {
                _id: 
                {
                    type: Schema.Types.ObjectId, 
                    required: true,
                    unique: false 
                },
                area: 
                {
                    type: String, 
                    required: true 
                },
                stage: 
                {
                    type: Schema.Types.ObjectId, 
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
                    required: true
                },
                partsMetaData:
                {
                    type: [PartMetaDataSchema]
                },
                currentPart: 
                {
                    type: Number, 
                    required: true, 
                    default: 1
                },
                nextPart:
                {
                    type: Number, 
                    required: true, 
                    default: 1  
                }
            }
        )


// Learning Module Interface 
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


// Learning Module Schema 
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