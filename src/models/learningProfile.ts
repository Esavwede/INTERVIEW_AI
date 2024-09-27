
import mongoose, { Schema, Document, Types, ObjectId} from "mongoose" 
import { IPartMetaData, PartMetaDataSchema } from "./LearningModule"
 

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



export interface ILearningProfile extends Document 
{
    userId: Types.ObjectId | string 
    learningModules?: ILearningModuleOverview[] 
}

export type CreateLearningProfile_Req = Pick<ILearningProfile, 'userId' | 'learningModules' >

const LearningProfileSchema = new Schema
            (
                {
                    userId: 
                    {
                        type: Schema.Types.ObjectId,
                        required: true 
                    },
                    learningModules:
                    {
                        type: [LearningModuleOverviewSchema] 
                    }  
                }
            )


export const LearningProfile = mongoose.model("learningProfile", LearningProfileSchema ) 