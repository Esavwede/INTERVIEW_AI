

import mongoose, { Document, ObjectId, Schema, Types } from "mongoose"

//  Learning Module PartMetadata Interface 
export interface IPartMetaData 
{
    _id:  Types.ObjectId | string,
    title: string, 
    hasBeenCompleted: boolean 
}



// Learning Module Parts Metadata 
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


// Learning Module Part Content Interface
export interface IPartContent 
{
    _id: ObjectId,
    type: string, 
    value: string 
}


// Learning Module Part Content Schema 
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


// Learning Module Part Interface 
export interface ILearningModulePart extends Document 
{
    title: string, 
    learningModuleId?: ObjectId, 
    quizId?: ObjectId,
    content: IPartContent[],
    isLast: boolean 
}


// Learning Module Part Schema 
export const LearningModulePartSchema = new Schema<ILearningModulePart> 
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