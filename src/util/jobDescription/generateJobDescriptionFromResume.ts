
import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "@src/system/logger/logger";

export async function generateJobDescriptionWithAI( jobRole: string, experienceLevel: string, resume: string )
{

  


      const JOB_ROLE_GENERATION_PROMPT = `
      Your_Instructions: You are an AI system that specializes in creating complete job descriptions exactly as they would appear on real-world job listing platforms like LinkedIn, Indeed, etc.

      - You must generate the entire job description yourself without leaving any placeholders or gaps for the user to fill in.
      - You must provide only the job description you created, without adding any extra text or AI assistant commentary.

      You will use three inputs:

      1. The user's job role: Based on this, you will determine the job title and responsibilities for the job description.
      2. The user's experience level: You will tailor the job description to match the specified seniority, ensuring it fits the appropriate level (e.g., junior, mid-level, senior).
      3. The user's resume: Extract relevant skills from the resume and ensure the job description you create includes these skills. For example, if the user is a backend developer with Python experience, do not include irrelevant technologies like C#. Ensure the technologies and skills match what the user has.

      - You will also generate a fictional company name, location, and job-specific details like responsibilities, qualifications, benefits, and any other typical sections of a real-world job description.

      Important: Do not include any placeholder text like [yourcompanyname]. Instead, generate all details yourself.

      Role: ${jobRole}
      Experience Level: ${experienceLevel}
      Resume: ${resume}
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

export async function extractCompanyNameFromJobDescription( jobDescription: string )
{
  try 
  {
      const prompt = `Your Task: Examine the job description below and return only the company name
      
      - Note! You should only return the company name and nothing else 

      Now Extract the company name from the job description below

      JobDescription: 
      ${jobDescription}
      `


      const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '' 
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
      async function run() 
      {
                  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                  const result = await model.generateContent( prompt  );
                  console.log(result.response.text());
                  return result.response.text() 
      }
  
      const result = run() 
       return result 

  }
  catch(e: any)
  {
    logger.error(e,"could not extract company name from job description")
    return 'Logby' // fictional company name 
  }
}