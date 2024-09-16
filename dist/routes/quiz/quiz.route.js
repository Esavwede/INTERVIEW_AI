"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizModuleRoutes = quizModuleRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const quiz_controller_1 = require("@src/controller/quiz/quiz.controller");
const quiz_schema_1 = require("@src/schemas/quiz/quiz.schema");
const router = (0, express_1.Router)();
function quizModuleRoutes(app) {
    try {
        const quizController = new quiz_controller_1.QuizController();
        router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(quiz_schema_1.CreateQuizValidationSchema), quizController.create.bind(quizController));
        router.get('/:id', (0, validateRequestSchema_1.validateRequestSchema)(quiz_schema_1.FindQuizValidationSchema), quizController.get.bind(quizController));
        router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(quiz_schema_1.UpdateQuizValidationSchema), quizController.update.bind(quizController));
        router.delete('/:id', (0, validateRequestSchema_1.validateRequestSchema)(quiz_schema_1.DeleteQuizValidationSchema), quizController.delete.bind(quizController));
        app.use('/api/v1/quizzes', router);
        logger_1.default.info("Quiz Routes Built");
    }
    catch (e) {
        logger_1.default.error(e, "QUIZ ROUTE ERROR");
    }
}
//# sourceMappingURL=quiz.route.js.map