

import mongoose, { Schema } from "mongoose" 


const StageSchema = new Schema 
            (
                {
                    name:
                    {
                        type: String, 
                        required: true
                    },
                    number:
                    {
                        type: Number, 
                        required: true 
                    }
                }
            )


    
export const Stage = mongoose.model('stage', StageSchema )
