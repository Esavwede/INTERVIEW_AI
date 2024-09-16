"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="88348159-e605-5779-8a9b-e5757296511e")}catch(e){}}();

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
//# sourceMappingURL=learningProfile.schema.js.map
//# debugId=88348159-e605-5779-8a9b-e5757296511e
