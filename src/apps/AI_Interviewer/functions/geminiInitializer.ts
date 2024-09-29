


import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from "dotenv"
config() 

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''

export function initiliazeGeminiAI()
{
    if( !GEMINI_API_KEY )
        {
            console.log("GEMINI API KEY NOT PROVIDED")
            process.exit(1) 
        }

    return new GoogleGenerativeAI( GEMINI_API_KEY );
}
