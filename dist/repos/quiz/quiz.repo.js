"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8e4b261e-a3f4-58e5-9d8b-8a5b02bbbfb7")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepo = void 0;
const Quiz_1 = require("@src/models/Quiz");
class QuizRepo {
    constructor() {
    }
    create(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Quiz_1.Quiz.create(quiz);
        });
    }
    find(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var quiz = yield Quiz_1.Quiz.findById(_id).populate({ path: 'questions', select: '_id text options' }).select('_id description title questions moduleId modulePartNumber').lean();
            return quiz;
        });
    }
    update(_id, updateBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield Quiz_1.Quiz.updateOne({ _id }, updateBody, { rawResult: true }).lean();
            return modifiedCount;
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
//# debugId=8e4b261e-a3f4-58e5-9d8b-8a5b02bbbfb7
