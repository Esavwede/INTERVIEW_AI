"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstname: zod_1.z.string().min(2, 'firstname length below 2').max(50, 'firstname length cannot be more than 50'),
        lastname: zod_1.z.string().min(2, 'lastname length below 2').max(50, 'lastname length cannot be more than 50'),
        email: zod_1.z.string().email(' Invalid Email'),
        password: zod_1.z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(64, "Password must be less than 64 characters"),
        confirmPassword: zod_1.z.string()
    })
        .refine(data => data.password === data.confirmPassword, { message: "passwords do not match", path: ["confirm password"] })
});
