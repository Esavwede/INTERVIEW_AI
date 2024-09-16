"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e4b9f2bf-b9e8-58c0-9df0-ab1acfc3c158")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLearningAreaValidationSchema = exports.CreateLearningAreaValidationSchema = void 0;
const zod_1 = require("zod");
exports.CreateLearningAreaValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        area: zod_1.z.string().min(1, 'Input a Learning Area Name')
    })
});
exports.DeleteLearningAreaValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Input a Learning Area ID')
    })
});
//# sourceMappingURL=learningArea.schema.js.map
//# debugId=e4b9f2bf-b9e8-58c0-9df0-ab1acfc3c158
