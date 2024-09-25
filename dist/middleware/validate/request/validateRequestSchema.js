"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a4bf9d67-00a7-5a5d-aac6-bb92d48b39b7")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = validateRequestSchema;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const zod_1 = require("zod");
function validateRequestSchema(schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                var errs = [];
                e.errors.forEach((e) => { errs.push(e.message); });
                logger_1.default.error('Zod: Request Schema Error');
                logger_1.default.error(errs);
                return res.status(422).json({ success: false, msg: "bad request", errors: errs });
            }
            logger_1.default.error(`Server: Request Schema Validation Error ${e}`);
            return res.status(500).json({ success: false, msg: "Server Error" });
        }
    };
}
//# sourceMappingURL=validateRequestSchema.js.map
//# debugId=a4bf9d67-00a7-5a5d-aac6-bb92d48b39b7
