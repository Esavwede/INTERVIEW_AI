

import mongoose, { Schema } from "mongoose" 


const StageSchema = new Schema 
            (
                {
                    name:
                    {
                        type: String, 
                        required: true
                    }
                }
            )


    
export const Stage = mongoose.model('stage', StageSchema )
