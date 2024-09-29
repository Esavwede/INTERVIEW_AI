"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ca192119-e448-5842-999b-2a10c4069b95")}catch(e){}}();

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

Role: ${jobRole}
experienceLevel: ${experienceLevel}
resume: ${resume}
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
//# debugId=ca192119-e448-5842-999b-2a10c4069b95
