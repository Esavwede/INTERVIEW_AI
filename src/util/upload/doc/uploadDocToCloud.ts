
import { config } from "dotenv"
config() 
import logger from "@src/system/logger/logger";
import { v2 } from "cloudinary"
import { Logger } from "pino";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";



const cloudinary = v2 

// Configure Cloudinary with your account details
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


export async function uploadFile( filePath: string, childLogger: Logger)
{
  try 
  {
      const { secure_url, public_id, url } = await cloudinary.uploader.upload( filePath ,{ resource_type: 'raw'})
      childLogger.debug(`Resume Uploaded Successfully`)
      console.log('---Debug----') 
      console.log( secure_url ) 
      return { public_id, url }
  }
  catch(e: any)
  {
    childLogger.error(e,"Could Not Upload File")
    throw new ServerError('Server Error') 
  }
}

