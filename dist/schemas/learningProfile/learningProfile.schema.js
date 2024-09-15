"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLearningProfileValidationSchema = void 0;
const zod_1 = require("zod");
const learningModulesOverviewSchema = zod_1.z.object({
    moduleId: zod_1.z.string().min(1, "ENTER LEARNING MODULE ID"),
    stage: zod_1.z.string().min(1, "ENTER LEARNING MODULE STAGE ID"),
    title: zod_1.z.string().min(1, "INPUT LEARNING MODULE TITLE"),
    description: zod_1.z.string().min(1, "INPUT LEARNING MODULE DESCRIPTION")
});
exports.CreateLearningProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "INPUT USER ID FOR LEARNING PROFILE"),
        learningModules: zod_1.z.array(learningModulesOverviewSchema).optional()
    })
});
