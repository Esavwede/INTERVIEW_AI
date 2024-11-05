"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77f44cd8-404f-5cf8-baa7-927ae48e852d")}catch(e){}}();

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
            try {
                yield this.quizRepo.create(quiz);
                logger_1.default.info("Quiz Created");
            }
            catch (e) {
                logger_1.default.error(e, "Error Occured While Creating Quiz");
                throw new serverError_1.ServerError("Server Error. Error Occured while creating quiz");
            }
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
//# sourceMappingURL=quiz.service.js.map
//# debugId=77f44cd8-404f-5cf8-baa7-927ae48e852d
