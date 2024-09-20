"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d15b716e-02c0-58d5-97de-1a846e74765d")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionsValidationSchema = void 0;
const zod_1 = require("zod");
const OptionSchema = zod_1.z.object({
    char: zod_1.z.string().min(1, 'ENTER OPTION LETTER').max(1, 'OPTION LETTER LENGTH CANNOT BE GREATER THAN ONE'),
    value: zod_1.z.string().min(1, 'ENTER OPTION TEXT')
});
const QuestionsSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'INPUT QUESTION TEXT'),
    area: zod_1.z.string().min(1, 'INPUT QUESTION AREA'),
    stage: zod_1.z.string().min(1, 'INPUT QUESTION AREA'),
    options: zod_1.z.array(OptionSchema),
    answer: OptionSchema
});
exports.CreateQuestionsValidationSchema = zod_1.z.array(QuestionsSchema);
//# sourceMappingURL=question.schema.js.map
//# debugId=d15b716e-02c0-58d5-97de-1a846e74765d
