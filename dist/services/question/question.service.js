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
exports.QuestionService = void 0;
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class QuestionService {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    create(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdQuestions = yield this.questionRepository.create(questions);
                var questionIds = [];
                createdQuestions.forEach(question => {
                    questionIds.push(question.id);
                });
                return questionIds;
            }
            catch (e) {
                logger_1.default.error(e, "SERVICE: ERROR OCCURED WHILE ADDING QUIZ QUESTIONS");
                throw new serverError_1.ServerError("ERROR OCCURED WHILE CREATING QUIZ");
            }
        });
    }
}
exports.QuestionService = QuestionService;
