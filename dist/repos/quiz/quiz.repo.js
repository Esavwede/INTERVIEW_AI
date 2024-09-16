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
exports.QuizRepo = void 0;
const Quiz_1 = require("@src/models/Quiz");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class QuizRepo {
    constructor() {
    }
    create(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield Quiz_1.Quiz.create(quiz);
                if (!newQuiz) {
                    return false;
                }
                return true;
            }
            catch (e) {
                logger_1.default.error(e, 'REPO ERROR: COULD NOT CREATE QUIZ');
                return false;
            }
        });
    }
    find(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var quiz = yield Quiz_1.Quiz.findById(_id).populate({ path: 'questions', select: '_id text options' }).select('_id description title questions moduleId modulePartNumber').lean();
            logger_1.default.debug(quiz);
            return quiz;
        });
    }
    update(_id, updateBody) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("QUIZ_REPO: UPDATING QUIZ");
            const result = yield Quiz_1.Quiz.updateOne({ _id }, updateBody, { rawResult: true }).lean();
            logger_1.default.info(result);
            return result.matchedCount;
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield Quiz_1.Quiz.deleteOne({ _id });
            return deletedCount;
        });
    }
}
exports.QuizRepo = QuizRepo;
//# sourceMappingURL=quiz.repo.js.map