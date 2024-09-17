"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = generateJwtToken;
exports.validateRequestToken = validateRequestToken;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const serverError_1 = require("../Errors/Endpoints/serverError");
dotenv_1.default.config();
function generateJwtToken(user) {
    try {
        const secretKey = process.env.JWT_SECRET;
        const options = config_1.default.get("jwt.options");
        if (!secretKey) {
            logger_1.default.error('JWT SECRET KEY UNDEFINED');
            return false;
        }
        const token = jsonwebtoken_1.default.sign(user, secretKey, options);
        return token;
    }
    catch (e) {
        logger_1.default.error(e, "JWT_SIGNING_ERROR");
        throw new serverError_1.ServerError("Server Encountered Error While Signing User ");
    }
}
function validateRequestToken(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        logger_1.default.error(e, `Error Occured while validating Request Token `);
        if (e instanceof jsonwebtoken_1.JsonWebTokenError)
            return res.status(401).json({ success: false, msg: e.message });
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
}
//# sourceMappingURL=tokens.js.map