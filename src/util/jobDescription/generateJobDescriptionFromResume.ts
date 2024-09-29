
import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "@src/system/logger/logger";

export async function generateJobDescriptionWithAI( jobRole: string, experienceLevel: string, resume: string )
{

  const JOB_ROLE_GENERATION_PROMPT = `
  
Your_Instructions: You are an AI system that specializes in creating job descriptions matching exactly how real world job descriptions would look like on platforms like.

- Note!, you are to come up with all the details and not leave any place holder for me to fill in
- Note!, you are to return only the job description you created, and I repeat only the job description you created 


- You will take three inputs

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