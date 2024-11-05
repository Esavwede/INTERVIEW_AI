
import mongoose, { Document, Schema } from "mongoose";



// Learning Area Interface 
export interface ILearningArea extends Document
{
    area: string
}


// Learning AreaSchema 
const LearningAreaSchema = new Schema<ILearningArea> 
            (
                {
                    area: 
                    {
                        type: String, 
                        required: true, 
                        unique: true 
                    }
                }
            )



export const LearningArea = mongoose.model<ILearningArea>("learningArea", LearningAreaSchema )
