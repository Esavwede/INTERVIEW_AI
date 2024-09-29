"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0611d0e1-7729-5b96-89c7-ef005f368279")}catch(e){}}();

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
exports.generateAudioFromText = generateAudioFromText;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const axios_1 = __importDefault(require("axios"));
function generateAudioFromText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('https://api.elevenlabs.io/v1/generate', {
                text: text,
                voice: 'your_voice_choice',
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            const audioUrl = response.data.audioUrl;
        }
        catch (e) {
            logger_1.default.error(e, "Error occured while generating audio from text");
        }
    });
}
//# sourceMappingURL=textToAudio.js.map
//# debugId=0611d0e1-7729-5b96-89c7-ef005f368279
