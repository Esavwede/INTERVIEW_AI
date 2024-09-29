"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="928eb394-3b89-5ef3-97fd-96a5324add3c")}catch(e){}}();

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
exports.generateJobDescriptions = generateJobDescriptions;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const generateJobDescriptionFromResume_1 = require("./generateJobDescriptionFromResume");
function generateJobDescriptions(userJobProfile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const numberOfJobDescriptions = 5;
            const { jobRole, experienceLevel, resume } = userJobProfile;
            var generatedJobDescriptions = [];
            let generatedJobDescription;
            for (let i = 0; i < numberOfJobDescriptions; i++) {
                generatedJobDescription = yield (0, generateJobDescriptionFromResume_1.generateJobDescriptionWithAI)(jobRole, experienceLevel, resume);
                generatedJobDescriptions.push(generatedJobDescription);
            }
            return generatedJobDescriptions;
        }
        catch (e) {
            logger_1.default.error(e, "Error Occured while generating job descriptions ");
        }
    });
}
//# sourceMappingURL=generateJobDescriptions.js.map
//# debugId=928eb394-3b89-5ef3-97fd-96a5324add3c
