"use strict";
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
            logger_1.default.error(e, 'Request Schema Error');
            if (e instanceof zod_1.ZodError) {
                var errs = [];
                e.errors.forEach((e) => { errs.push(e.message); });
                return res.status(422).json({ success: false, msg: "bad request", errors: errs });
            }
            return res.status(500).json({ success: false, msg: "Server Error" });
        }
    };
}
