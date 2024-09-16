"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const question_repo_1 = require("@src/repos/question/question.repo");
const question_service_1 = require("@src/services/question/question.service");
const quiz_service_1 = require("@src/services/quiz/quiz.service");
const quiz_repo_1 = require("@src/repos/quiz/quiz.repo");
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
class QuizController {
    constructor() {
        const questionRepo = new question_repo_1.QuestionRepo();
        this.questionService = new question_service_1.QuestionService(questionRepo);
        const quizRepo = new quiz_repo_1.QuizRepo();
        this.quizService = new quiz_service_1.QuizSservice(quizRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("CONTROLLER: Creating New Quiz ");
                const { questions, description, title, moduleId, modulePartNumber } = req.body;
                const questionIds = yield this.questionService.create(questions);
                const quizBody = { description, title, moduleId, modulePartNumber, questions: questionIds };
                const quizCreated = yield this.quizService.create(quizBody);
                if (!quizCreated) {
                    return res.status(500).json({ success: false, msg: "SERVER ERROR" });
                }
                return res.status(201).json({ success: true, msg: "QUIZ CREATED" });
            }
            catch (e) {
                logger_1.default.error(e, '');
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield this.quizService.find(req.params.id);
                return res.status(200).json({ success: true, data: quiz });
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
                if (e instanceof serverError_1.ServerError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.quizService.update(req.params.id, req.body);
                return res.status(200).json({ success: true, msg: "Quiz updated successfully " });
            }
            catch (e) {
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield this.quizService.delete(req.params.id);
                if (deletedCount !== 1) {
                    return res.status(200).json({ success: true, msg: "Quiz Does Not Exist In Database " });
                }
                return res.status(200).json({ success: true, msg: "Quiz Deleted Successfully " });
            }
            catch (e) {
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
}
exports.QuizController = QuizController;
//# sourceMappingURL=quiz.controller.js.map