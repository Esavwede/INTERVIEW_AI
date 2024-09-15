
import mongoose, { Schema, Document, Types, ObjectId} from "mongoose" 
 

export interface ILearningModuleOverview extends Document 
{
    moduleId: Types.ObjectId | string, 
    area: string, 
    stage: ObjectId | string, 
    title: string,
    description: string,
    imgSrc: string,
    totalParts: number, 
    currentPart: number,
    nextPart: number 
}

export interface ILearningModuleOverview_Req
{
    moduleId: Types.ObjectId | string, 
    stage: Types.ObjectId | string, 
    title: string,
    description: string 
}



export const LearningModuleOverviewSchema = new Schema<ILearningModuleOverview>
        (
            {
                moduleId: 
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