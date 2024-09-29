"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="031f713d-f006-5e82-9d48-f0420429285d")}catch(e){}}();

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
exports.fetchUserResumeAsText = fetchUserResumeAsText;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const axios_1 = __importDefault(require("axios"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function fetchUserResumeAsText(resumeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.debug("Fetching Resume From Cloudinary");
            const username = process.env.CLOUDINARY_API_KEY || '';
            const password = process.env.CLOUDINARY_API_SECRET || '';
            const response = yield (0, axios_1.default)({
                url: resumeUrl,
                method: 'GET',
                responseType: 'arraybuffer',
            });
            const contentType = response.headers['content-type'];
            const documentBuffer = response.data;
            if (contentType === 'application/pdf') {
                return yield handlePdfDocument(documentBuffer);
            }
            else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                return yield handleDocxDocument(documentBuffer);
            }
            else {
                throw new Error(`Unsupported document type: ${contentType}`);
            }
        }
        catch (error) {
            console.error('Error fetching or processing document:', error);
            throw error;
        }
    });
}
const handlePdfDocument = (pdfBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, pdf_parse_1.default)(pdfBuffer);
        return data.text;
    }
    catch (error) {
        console.error('Error processing PDF document:', error);
        throw error;
    }
});
const handleDocxDocument = (docxBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mammoth_1.default.extractRawText({ buffer: docxBuffer });
        return result.value;
    }
    catch (error) {
        console.error('Error processing DOCX document:', error);
        throw error;
    }
});
//# sourceMappingURL=fetchUserResume.js.map
//# debugId=031f713d-f006-5e82-9d48-f0420429285d
