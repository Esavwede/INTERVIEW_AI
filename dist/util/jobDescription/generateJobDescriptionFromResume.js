"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bd13973d-c614-5848-abf1-6acf92359759")}catch(e){}}();

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

  1. The user's job role: Based on this, you will determine the job title and responsibilities for the job description.
  2. The user's experience level: You will tailor the job description to match the specified seniority, ensuring it fits the appropriate level (e.g., junior, mid-level, senior).
  3. The user's resume: Extract relevant skills from the resume and ensure the job description you create includes these skills. For example, if the user is a backend developer with Python experience, do not include irrelevant technologies like C#. Ensure the technologies and skills match what the user has.

  In addition to the job description, you will generate the following fictional company-specific details:
  - A fictional company name
  - A fictional company email address
  - A fictional company location
  - Job-specific details including responsibilities, qualifications, benefits, and any other typical sections of a real-world job description.

  Important: Do not include any placeholder text like [yourcompanyname]. Instead, generate all details yourself.

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
//# debugId=bd13973d-c614-5848-abf1-6acf92359759
