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
exports.QuizSservice = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
class QuizSservice {
    constructor(quizRepo) {
        this.quizRepo = quizRepo;
    }
    create(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizCreated = yield this.quizRepo.create(quiz);
            if (!quizCreated) {
                return false;
            }
            logger_1.default.info("Quiz Created");
            return true;
        });
    }
    find(quizID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield this.quizRepo.find(quizID);
                if (!quiz) {
                    throw new notFoundError_1.NotFoundError(`COULD NOT FIND QUIZ WITH ID ${quizID}`);
                }
                return quiz;
            }
            catch (e) {
                logger_1.default.error(e, `DATABASE ERROR: ERROR WHILE FINDING QUIZ WITH ID: ${quizID}`);
                throw new serverError_1.ServerError("SERVER ENCOUNTED ERROR WHILE FINDING QUIZ");
            }
        });
    }
    update(quizID, updateBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedQuiz = yield this.quizRepo.update(quizID, updateBody);
                logger_1.default.info("Updated Quiz Result");
                logger_1.default.info(updatedQuiz);
                if (updatedQuiz !== 1) {
                    logger_1.default.error("COULD NOT FIND QUIZ TO UPDATE");
                    throw new notFoundError_1.NotFoundError(`QUIZ_UPDATE_ERROR: Did Not Find Quiz With ID: ${quizID} for Update `);
                }
            }
            catch (e) {
                throw new serverError_1.ServerError(`SERVER_ERROR: ERROR OCCURED WHILE UPDATING QUIZ WITH ID: ${quizID}`);
            }
        });
    }
    delete(quizID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield this.quizRepo.delete(quizID);
                return deletedCount;
            }
            catch (e) {
                throw new serverError_1.ServerError(`SERVER_ERROR: ERROR OCCURED WHILE DELETING QUIZ WITH ID ${quizID}`);
            }
        });
    }
}
exports.QuizSservice = QuizSservice;
