"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="314bdebf-51f5-5242-ac7d-15033ef3c105")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingValidationSchema = exports.LearningModuleOverviewSchema = void 0;
const zod_1 = require("zod");
exports.LearningModuleOverviewSchema = zod_1.z.object({
    moduleId: zod_1.z.string().min(1, 'Input Learning Module Id'),
    stage: zod_1.z.string().min(1, 'Input Learning Module Overview Stage'),
    title: zod_1.z.string().min(1, 'Input Learnng Module Summary Title'),
    description: zod_1.z.string().min(1, "Input Learning Module Description"),
    imgSrc: zod_1.z.string().min(1, "Input Learning Module Overview image Url"),
});
exports.OnboardingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        learningModules: zod_1.z.array(exports.LearningModuleOverviewSchema)
    })
});
//# sourceMappingURL=onboarding.schema.js.map
//# debugId=314bdebf-51f5-5242-ac7d-15033ef3c105
