"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f20d053b-fc70-584a-be09-9c3f13ec1dee")}catch(e){}}();

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
exports.generateJobRoleFromResume = generateJobRoleFromResume;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const generative_ai_1 = require("@google/generative-ai");
const JobProfile_1 = __importDefault(require("@src/models/JobProfile"));
function generateJobRoleFromResume(userId, jobRole, experienceLevel, resumePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resumeTextContent = yield extractTextContentFromDocument(resumePath);
            logger_1.default.debug(`JOB_ROLE_GENERATOR: Extracted Text From user: ${userId}'s Resume`);
            logger_1.default.info(resumeTextContent);
            yield deleteResumeFromServer(resumePath);
            const generatedJobRole = yield generateJobRoleWithAI(jobRole, experienceLevel, resumeTextContent);
            yield saveGeneratedJobRoleToDB(userId, generatedJobRole);
        }
        catch (e) {
            logger_1.default.error(e, `ROLE_GENERATOR_ERROR: Could Not Generate Job Role`);
        }
    });
}
function extractTextContentFromDocument(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileExtension = path_1.default.extname(filePath).toLowerCase();
            const fileBuffer = yield promises_1.default.readFile(filePath);
            switch (fileExtension) {
                case '.pdf':
                    const pdfData = yield (0, pdf_parse_1.default)(fileBuffer);
                    logger_1.default.debug(`Text_From_Document_Extractor: Extracted text From PDF file `);
                    return pdfData.text;
                case '.docx':
                    const docxData = yield mammoth_1.default.extractRawText({ buffer: fileBuffer });
                    logger_1.default.debug(`Text_From_Document_Extractor: Extracted text From DOCX file `);
                    return docxData.value;
                case '.txt':
                    logger_1.default.debug(`Text_From_Document_Extractor: Extracted text From TEXT file `);
                    return fileBuffer.toString('utf-8');
                default:
                    throw new Error('Unsupported file type');
            }
        }
        catch (e) {
            logger_1.default.error(e, `Text_From_Document_Extractor: ERROR`);
            throw e;
        }
    });
}
function deleteResumeFromServer(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.unlink(filePath);
        logger_1.default.debug(`File ${filePath} deleted successfully.`);
    });
}
function generateJobRoleWithAI(jobRole, experienceLevel, resume) {
    return __awaiter(this, void 0, void 0, function* () {
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

Role: ${jobRole}
experienceLevel: ${experienceLevel}
resume: ${resume}
  `;
        const GEMINI_API_KEY = "AIzaSyDZtoTyjwzfjnyG09c2wF2bmVcmewEfi7Y";
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
function saveGeneratedJobRoleToDB(userId, generatedJobRole) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield JobProfile_1.default.updateOne({ userId }, { $push: { generatedJobRoles: { roleContent: generatedJobRole } } });
            logger_1.default.debug(`Generated Job Description Saved to user job profile`);
        }
        catch (e) {
            logger_1.default.error(e, `Error Occured while saving Generated Job Descrition to database `);
        }
    });
}
//# sourceMappingURL=generateJobRole.js.map
//# debugId=f20d053b-fc70-584a-be09-9c3f13ec1dee
