"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c1d2f04c-7925-53a8-a7c8-70826bf7ce0c")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJobDescriptionWithAI = generateJobDescriptionWithAI;
exports.extractCompanyNameFromJobDescription = extractCompanyNameFromJobDescription;
const generative_ai_1 = require("@google/generative-ai");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function generateJobDescriptionWithAI(jobRole, experienceLevel, resume) {
    return __awaiter(this, void 0, void 0, function* () {
        const JOB_ROLE_GENERATION_PROMPT = `
  Your_Instructions: You are an AI system that specializes in creating complete job descriptions exactly as they would appear on real-world job listing platforms like LinkedIn, Indeed, etc.

  - You must generate the entire job description yourself without leaving any placeholders or gaps for the user to fill in.
  - You must provide only the job description you created, without adding any extra text or AI assistant commentary.

  You will use three inputs:

  1. The user's job role: You will create a job title and responsibilities based on this input. Ensure the job role is clear and concise (e.g., Backend Developer, Project Manager).
  2. The user's experience level: Tailor the job description to match the specified seniority (e.g., junior, mid-level, senior), including responsibilities and qualifications that fit the appropriate level of expertise.
  3. The user's resume: Extract relevant skills and technologies from the resume, ensuring that only those applicable to the user's experience are included. For example, if the user is a backend developer with Python experience, avoid including irrelevant technologies like C#. Focus on matching the user's core skills.

  In addition to the job description, you will generate the following fictional company-specific details:
  - A fictional company name that sounds realistic and industry-appropriate.
  - A fictional company email address.
  - A fictional company location (city and country).
  - Job-specific details including responsibilities, qualifications, benefits, employment type (e.g., full-time, part-time), and any other typical sections of a real-world job description.
  - Include any additional relevant sections, such as salary range, working hours, or remote work options, if applicable to the role.

  Important:
  - Do not include any placeholder text like [yourcompanyname]. Generate all details yourself.
  - Ensure the fictional company details are consistent throughout the job description and match the role’s industry or expertise level.

  Role: ${jobRole}
  Experience Level: ${experienceLevel}
  Resume: ${resume}
  `;
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
        const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
        function run() {
            return __awaiter(this, void 0, void 0, function* () {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = yield model.generateContent(JOB_ROLE_GENERATION_PROMPT);
                console.log(result.response.text());
                return result.response.text();
            });
        }
        const result = run();
        return result;
    });
}
function extractCompanyNameFromJobDescription(jobDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = `Your Task: Examine the job description below and return only the company name
      
      - Note! You should only return the company name and nothing else 

      Now Extract the company name from the job description below

      JobDescription: 
      ${jobDescription}
      `;
            const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
            const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
            function run() {
                return __awaiter(this, void 0, void 0, function* () {
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    const result = yield model.generateContent(prompt);
                    console.log(result.response.text());
                    return result.response.text();
                });
            }
            const result = run();
            return result;
        }
        catch (e) {
            logger_1.default.error(e, "could not extract company name from job description");
            return 'Logby';
        }
    });
}
//# sourceMappingURL=generateJobDescriptionFromResume.js.map
//# debugId=c1d2f04c-7925-53a8-a7c8-70826bf7ce0c
