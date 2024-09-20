"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4fec03fb-7c46-570f-8421-481132ffc35b")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserFirstAndLastNameValidationSchema = exports.VerifyUserValidationSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email not Found In Request Body",
            invalid_type_error: "email must be of type String",
        })
            .email(' Invalid Email'),
        password: zod_1.z.string({
            required_error: "password not Found In Request Body",
            invalid_type_error: "password must be of type String",
        })
            .min(5, "Password must be at least 5 characters long")
            .max(64, "Password must be less than 64 characters"),
        confirmPassword: zod_1.z.string({
            required_error: "confirmPassword not Found In Request Body",
            invalid_type_error: "confirmPassword must be of type String",
        })
    })
        .refine(data => data.password === data.confirmPassword, { message: "passwords do not match", path: ["confirm password"] })
});
exports.VerifyUserValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        token: zod_1.z.string({
            required_error: "token not Found In Request QueryParams",
            invalid_type_error: "token must be of type String",
        })
            .min(6, 'VERIFICATION TOKEN NOT VALID')
    })
});
exports.SaveUserFirstAndLastNameValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstname: zod_1.z.string({
            invalid_type_error: "Firstname Must be of Type String"
        }).optional(),
        lastname: zod_1.z.string({
            invalid_type_error: "Lastname must be of type string"
        }).optional(),
        email: zod_1.z.string({
            invalid_type_error: "email must be of type string"
        }).optional()
    })
});
//# sourceMappingURL=signupSchema.js.map
//# debugId=4fec03fb-7c46-570f-8421-481132ffc35b
