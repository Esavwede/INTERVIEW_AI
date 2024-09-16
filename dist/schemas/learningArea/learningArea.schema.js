"use strict";
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