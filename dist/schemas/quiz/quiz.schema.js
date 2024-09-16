"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuizValidationSchema = exports.UpdateQuizValidationSchema = exports.FindQuizValidationSchema = exports.CreateQuizValidationSchema = void 0;
const zod_1 = require("zod");
const question_schema_1 = require("../question/question.schema");
exports.CreateQuizValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'INPUT QUIZ TITLE'),
        description: zod_1.z.string().min(1, 'INPUT QUIZ DESCRIPTION'),
        moduleId: zod_1.z.string().min(1, 'INPUT MODULE ID'),
        modulePartNumber: zod_1.z.number(),
        questions: question_schema_1.CreateQuestionsValidationSchema
    })
});
exports.FindQuizValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'INPUT QUIZ ID')
    })
});
exports.UpdateQuizValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'INPUT QUIZ TITLE').optional(),
        description: zod_1.z.string().min(1, 'INPUT QUIZ DESCRIPTION').optional(),
        moduleId: zod_1.z.string().min(1, 'INPUT MODULE ID').optional(),
        modulePartNumber: zod_1.z.number().optional(),
        questions: question_schema_1.CreateQuestionsValidationSchema.optional()
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'INPUT QUIZ ID IN PARAMS')
    })
});
exports.DeleteQuizValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'INPUT QUIZ ID')
    })
});
//# sourceMappingURL=quiz.schema.js.map