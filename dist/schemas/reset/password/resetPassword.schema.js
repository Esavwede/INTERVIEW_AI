"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f1eddc51-db77-5f84-9b7f-f984db908d84")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPasswordResetEmailValidationSchema = exports.ResetPasswordValidationSchema = void 0;
const zod_1 = require("zod");
exports.ResetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "new password required",
            invalid_type_error: "new password must be of type string"
        }),
        confirmPassword: zod_1.z.string({
            required_error: "confirm password field required",
            invalid_type_error: "confirm password field must be of type string"
        })
    })
        .refine(data => data.confirmPassword === data.password, { message: "confirm password and password don't match", path: ['confirmPassword'] }),
    query: zod_1.z.object({
        token: zod_1.z.string({
            required_error: "password reset token required",
            invalid_type_error: "password reset token must be of type string"
        })
    })
});
exports.GetPasswordResetEmailValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email required",
            invalid_type_error: "email must be of type string"
        })
            .email({ message: "please input a valid email" })
    })
});
//# sourceMappingURL=resetPassword.schema.js.map
//# debugId=f1eddc51-db77-5f84-9b7f-f984db908d84
