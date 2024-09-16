"use strict";
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
exports.sendMail = sendMail;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const serverError_1 = require("../Errors/Endpoints/serverError");
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});
function sendMail(mailOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, subject, text, html } = mailOptions;
            const result = yield mg.messages.create('sandboxe7bb68fd69ec47c8b3bc14a21fab66ed.mailgun.org', {
                from: "Interview AI <mailgun@sandboxe7bb68fd69ec47c8b3bc14a21fab66ed.mailgun.org>",
                to: [email],
                subject,
                text,
                html
            });
            logger_1.default.info(result);
        }
        catch (e) {
            logger_1.default.error(e, "Error Occured While Sending Mail");
            throw new serverError_1.ServerError("Error Occured While Sending Mail");
        }
    });
}
//# sourceMappingURL=sendMain.js.map