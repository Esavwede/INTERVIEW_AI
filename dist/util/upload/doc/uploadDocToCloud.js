"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3b07ad67-3a7f-51c0-8f39-128ae0b19675")}catch(e){}}();

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
exports.uploadFile = uploadFile;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cloudinary_1 = require("cloudinary");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function uploadFile(filePath, childLogger) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { secure_url, public_id } = yield cloudinary.uploader.upload(filePath, { resource_type: 'raw' });
            childLogger.debug(`Resume Uploaded Successfully`);
            console.log('---Debug----');
            console.log(secure_url);
            return { public_id, secure_url };
        }
        catch (e) {
            childLogger.error(e, "Could Not Upload File");
            throw new serverError_1.ServerError('Server Error');
        }
    });
}
//# sourceMappingURL=uploadDocToCloud.js.map
//# debugId=3b07ad67-3a7f-51c0-8f39-128ae0b19675
