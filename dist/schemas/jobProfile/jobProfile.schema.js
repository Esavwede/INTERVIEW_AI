"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77f7057e-e364-5492-8724-581491f62f08")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteJobProfileValidationSchema = exports.CreateJobProfileValidationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = [
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
];
exports.CreateJobProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobRole: zod_1.z.string({
            required_error: "JOB ROLE FIELD NOT IN REQUEST BODY",
            invalid_type_error: "JOB ROLE VALUE MUST BE OF TYPE STRING"
        }),
        experienceLevel: zod_1.z.string({
            required_error: "EXPERIENCE LEVEL FIELD NOT IN REQUEST BODY",
            invalid_type_error: "EXPERIENCE LEVEL VALUE MUST BE OF TYPE STRING"
        })
    })
});
exports.DeleteJobProfileValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string()
            .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), { message: "Not a valid object Id" })
    })
});
//# sourceMappingURL=jobProfile.schema.js.map
//# debugId=77f7057e-e364-5492-8724-581491f62f08
