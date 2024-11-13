"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="61c75637-b52f-5f40-93e1-e8d2d72cb035")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendSignupMailValidationSchema = void 0;
const zod_1 = require("zod");
exports.ResendSignupMailValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email field required",
            invalid_type_error: "invalid email"
        }).email("invalid email")
    })
});
//# sourceMappingURL=mail.schema.js.map
//# debugId=61c75637-b52f-5f40-93e1-e8d2d72cb035
