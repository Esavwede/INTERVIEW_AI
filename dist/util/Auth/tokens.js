"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = generateJwtToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
dotenv_1.default.config();
function generateJwtToken(user) {
    const secretKey = process.env.JWT_SECRET;
    const options = config_1.default.get("jwt.options");
    if (!secretKey) {
        logger_1.default.error('JWT SECRET KEY UNDEFINED');
        return false;
    }
    const token = jsonwebtoken_1.default.sign(user, secretKey, options);
    return token;
}
