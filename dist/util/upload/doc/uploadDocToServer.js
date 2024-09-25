"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fa20a239-fc07-50df-b8ea-8f48bb4c6689")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToServer = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.resolve("src", "uploads");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const fileExt = path_1.default.extname(file.originalname);
        const parentPath = path_1.default.resolve("src", "uploads");
        const filePath = `${userId}-resume${fileExt}`;
        const fullPath = path_1.default.join(parentPath, filePath);
        req.resumePath = fullPath;
        cb(null, filePath);
    },
});
exports.uploadToServer = (0, multer_1.default)({ storage, limits: { fileSize: 3 * 1024 * 1024 } });
//# sourceMappingURL=uploadDocToServer.js.map
//# debugId=fa20a239-fc07-50df-b8ea-8f48bb4c6689
