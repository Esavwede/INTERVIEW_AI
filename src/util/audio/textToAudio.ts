
import logger from "@src/system/logger/logger";
import axios from "axios";


export async function generateAudioFromText(text: string )
{
    try 
    {
        const response = await axios.post(
            'https://api.elevenlabs.io/v1/generate', // Use the correct endpoint from the Eleven Labs API
            {
                text: text, // Text to convert to audio
                voice: 'your_voice_choice', // Specify the voice you want to use
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        // Assuming the response contains a URL to the generated audio
        const audioUrl = response.data.audioUrl;
    }
    catch(e: any)
    {
        logger.error(e,"Error occured while generating audio from text") 
    }
}