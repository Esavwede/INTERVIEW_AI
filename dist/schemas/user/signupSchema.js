"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="843b18e4-6abb-58b2-973b-ecffe6258607")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyUserValidationSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstname: zod_1.z.string({
            required_error: "firstname not Found In Request Body",
            invalid_type_error: "firstname must be of type String",
        })
            .min(2, 'firstname length below 2')
            .max(50, 'firstname length cannot be more than 50'),
        lastname: zod_1.z.string({
            required_error: "lastname not Found In Request Body",
            invalid_type_error: "lastname must be of type String",
        })
            .min(2, 'lastname length below 2')
            .max(50, 'lastname length cannot be more than 50'),
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
//# sourceMappingURL=signupSchema.js.map
//# debugId=843b18e4-6abb-58b2-973b-ecffe6258607
