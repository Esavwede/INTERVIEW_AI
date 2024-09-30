

import logger from "@src/system/logger/logger";
import { ElevenLabsClient, play } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: "YOUR_API_KEY" // Defaults to process.env.ELEVENLABS_API_KEY
})


export async function generateAudioFromText(text: string )
{
    try 
    {
        const audio = await elevenlabs.generate({
            voice: "Rachel",
            text,
            model_id: "eleven_multilingual_v2"
          });
          
          await play(audio);
    }
    catch(e: any)
    {
        logger.error(e,'Could Not Generate Audio From text ') 
    }
}