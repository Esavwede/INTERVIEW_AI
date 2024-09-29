"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2777e49f-1211-5b48-bbf9-242a3883a43a")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.initiliazeGeminiAI = initiliazeGeminiAI;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
function initiliazeGeminiAI() {
    if (!GEMINI_API_KEY) {
        console.log("GEMINI API KEY NOT PROVIDED");
        process.exit(1);
    }
    return new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
}
//# sourceMappingURL=geminiInitializer.js.map
//# debugId=2777e49f-1211-5b48-bbf9-242a3883a43a
