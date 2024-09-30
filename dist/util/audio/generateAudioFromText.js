"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="23c1447c-c2ab-5ef0-8dfd-3c3a4f2d2a61")}catch(e){}}();

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
const elevenlabs_1 = require("elevenlabs");
const elevenlabs = new elevenlabs_1.ElevenLabsClient({
    apiKey: "YOUR_API_KEY"
});
function generateAudioFromText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const audio = yield elevenlabs.generate({
                voice: "Rachel",
                text,
                model_id: "eleven_multilingual_v2"
            });
            yield (0, elevenlabs_1.play)(audio);
        }
        catch (e) {
            logger_1.default.error(e, 'Could Not Generate Audio From text ');
        }
    });
}
//# sourceMappingURL=generateAudioFromText.js.map
//# debugId=23c1447c-c2ab-5ef0-8dfd-3c3a4f2d2a61
