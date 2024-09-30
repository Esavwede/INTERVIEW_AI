"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c965298d-e988-5ee1-9a97-b0db4eb3b4bb")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_Interviewer = void 0;
const geminiInitializer_1 = require("./functions/geminiInitializer");
const AI_Interviewer_Prompts_1 = require("./prompts/AI_Interviewer_Prompts");
const generatePromptForInterviewerResponse_1 = require("./functions/generatePromptForInterviewerResponse");
const InterviewTranscriptAnalyser_1 = require("./prompts/InterviewTranscriptAnalyser");
class AI_Interviewer {
    constructor() {
        this.gemini = (0, geminiInitializer_1.initiliazeGeminiAI)();
    }
    runPromptWithGemini(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = yield model.generateContent([prompt]);
            const textResult = result.response.text();
            return textResult;
        });
    }
    appendMessageToInterviewTranscript(interviewTranscript, message) {
        return interviewTranscript + '\n' + message;
    }
    prependStringToCandidateResponse(stringToPrepend, candidateResponse) {
        return stringToPrepend + ' ' + candidateResponse;
    }
    generateInterviewerNextResponse(interviewData, interviewTranscript) {
        return __awaiter(this, void 0, void 0, function* () {
            const interviewerResponsePrompt = (0, generatePromptForInterviewerResponse_1.generatePromptForInterviewerResponse)(interviewData, interviewTranscript);
            const nextResponse = yield this.runPromptWithGemini(interviewerResponsePrompt);
            return nextResponse;
        });
    }
    checkInterviewCompleted(interviewTranscript) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var prompt = AI_Interviewer_Prompts_1.INTERVIEW_COMPLETE_CHECKER + '\n' + interviewTranscript;
                var interviewCompleted = yield this.runPromptWithGemini(prompt);
                var finalResult = undefined;
                interviewCompleted = interviewCompleted.trim();
                if (interviewCompleted === 'true') {
                    finalResult = true;
                }
                if (interviewCompleted === 'false') {
                    finalResult = false;
                }
                return finalResult;
            }
            catch (e) {
                console.log(`INTERVIEWER_ERROR: COULD NOT CHECK INTERVIEW COMPLETE  ${e} `);
                process.exit(1);
            }
        });
    }
    generateInterviewResults(interviewTranscript) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = InterviewTranscriptAnalyser_1.INTERVIEW_RESULT_GENERATOR + '\n' + interviewTranscript;
            const interviewResult = yield this.runPromptWithGemini(prompt);
            return interviewResult;
        });
    }
}
exports.AI_Interviewer = AI_Interviewer;
//# sourceMappingURL=AI_Interviewer.js.map
//# debugId=c965298d-e988-5ee1-9a97-b0db4eb3b4bb
