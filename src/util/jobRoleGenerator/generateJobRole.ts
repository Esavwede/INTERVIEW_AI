
import { config } from "dotenv"
config() 

/*****************THE DIRTY FILE *********************************************** */
import fs from "fs/promises"
import path from "path" 
import pdfParse from "pdf-parse"
import mammoth from "mammoth" 
import logger from "@src/system/logger/logger"
import { GoogleGenerativeAI } from "@google/generative-ai"
import JobProfile from "@src/models/JobProfile"


export async function generateJobRoleFromResume( userId: string, jobRole: string, experienceLevel: string, resumePath: string )
{
    try 
    {
        const resumeTextContent = await extractTextContentFromDocument(resumePath)

        logger.debug(`JOB_ROLE_GENERATOR: Extracted Text From user: ${ userId }'s Resume`)
        logger.info( resumeTextContent ) 

        await deleteResumeFromServer( resumePath ) 

        const generatedJobRole = await generateJobRoleWithAI( jobRole, experienceLevel, resumeTextContent)

        await saveGeneratedJobRoleToDB( userId, generatedJobRole )

    }
    catch(e: any)
    {
        logger.error(e,`ROLE_GENERATOR_ERROR: Could Not Generate Job Role`)
    }
}

async function extractTextContentFromDocument( filePath: string  )
{
    try 
    {

        // Extract File Extension 
        const fileExtension = path.extname(filePath).toLowerCase();

        // Read the file buffer
        const fileBuffer = await fs.readFile(filePath)


        switch (fileExtension) {
            case '.pdf':
              // Extract text from PDF file
              const pdfData = await pdfParse(fileBuffer);

              logger.debug(`Text_From_Document_Extractor: Extracted text From PDF file `)
              return pdfData.text;
      
            case '.docx':
              // Extract text from DOCX file
              const docxData = await mammoth.extractRawText({ buffer: fileBuffer });
              logger.debug(`Text_From_Document_Extractor: Extracted text From DOCX file `)
              return docxData.value;
      
            case '.txt':
              // Extract text from TXT file
              logger.debug(`Text_From_Document_Extractor: Extracted text From TEXT file `)
              return fileBuffer.toString('utf-8');
      
            default:
              throw new Error('Unsupported file type') 
        }
    }
    catch(e: any) 
    {
        logger.error(e,`Text_From_Document_Extractor: ERROR`)
        throw e 
    }
}

async function deleteResumeFromServer( filePath: string )
{
  // Delete the file after successful extraction
  await fs.unlink(filePath);
  logger.debug(`File ${filePath} deleted successfully.`);
}


async function generateJobRoleWithAI( jobRole: string, experienceLevel: string, resume: string )
{


  const JOB_ROLE_GENERATION_PROMPT = `
  

Your_Instructions: You are an AI system that specializes in creating job descriptions matching exactly how real world job descriptions would look like on platforms like. You will take three inputs.

Input number one: 
The user's job role. You will use the job role to determine the job for which you will generate the description. 

Two is the experience level:
You will use the experience level to make the job description align with the relevant seniority specified. 

Three is the user's resume:
You will examine the resume and extract the skills which the user uses to perform the role, and make sure the job description you will generate contains those skills. Here's an analogy to make this instruction clearer,if the user is a 
backend developer that uses python , don't create a job description that the roles needs C#, when the user clearly does 
not have C# skills. So thats the idea.
Note: Do not include any of your ai assistant responses. Just come up with a fictional company and generate the job role with the rules and fill any place holder with fictional data, e.g [yourcompanyname].
So Let's Go!

Role: ${ jobRole }
experienceLevel: ${ experienceLevel }
resume: ${ resume }
  `     


    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '' 
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    async function run() 
    {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                const result = await model.generateContent( JOB_ROLE_GENERATION_PROMPT  );
                console.log(result.response.text());
                return result.response.text() 
    }

    const result = run() 
     return result 

}


async function saveGeneratedJobRoleToDB( userId: string, generatedJobRole: string )
{
  try 
  { 

      await JobProfile.updateOne
      (
        { userId },
        { $push: { generatedJobRoles: { roleContent: generatedJobRole }  }  }
      )


      logger.debug(`Generated Job Description Saved to user job profile`)
  } 
  catch(e: any)
  {
      logger.error(e,`Error Occured while saving Generated Job Descrition to database `)
  }
}

