"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e2fd546e-d231-5274-9bc1-67b8c5742593")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLearningModulePartSchema = exports.GetLearningModuleValidationSchema = exports.LearningModulePartValidationSchema = void 0;
const zod_1 = require("zod");
const SectionSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'INPUT SECTION TYPE'),
    value: zod_1.z.string().min(1, 'INPUT SECTION CONTENT')
});
const SectionUpdateSchema = zod_1.z.object({
    _id: zod_1.z.string().min(1, 'INPUT SECTION TYPE'),
    type: zod_1.z.string().min(1, 'INPUT SECTION TYPE'),
    value: zod_1.z.string().min(1, 'INPUT SECTION CONTENT')
});
const PartSchema = zod_1.z.array(SectionSchema);
exports.LearningModulePartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Part Title Must Be Provided", invalid_type_error: "Part Title Must be string" }),
        learningModuleId: zod_1.z.string().min(1, 'INPUT LEARNING MODULE ID'),
        quizId: zod_1.z.string().optional(),
        content: PartSchema,
        isLast: zod_1.z.boolean({
            required_error: "isLast Field Not Present",
            invalid_type_error: "Invalid value, expected a boolean (true or false)"
        })
    })
});
exports.GetLearningModuleValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        moduleId: zod_1.z.string().min(1, 'INPUT LEARNING MODULE ID'),
        partNumber: zod_1.z.string().min(1, 'INPUT LEARNING MODULE PART NUMBER')
    })
});
exports.UpdateLearningModulePartSchema = zod_1.z.object({
    body: zod_1.z.object({
        learningModuleId: zod_1.z.string().min(1, "Input Learning Module ID"),
        content: zod_1.z.array(SectionUpdateSchema)
    })
});
//# sourceMappingURL=learningModulePart.schema.js.map
//# debugId=e2fd546e-d231-5274-9bc1-67b8c5742593
