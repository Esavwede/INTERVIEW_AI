"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="57d7833b-0c4f-5642-8e52-c42ad43f0a11")}catch(e){}}();

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
exports.QuestionRepo = void 0;
const Question_1 = require("@src/models/Question");
class QuestionRepo {
    constructor() {
    }
    create(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdQuestions = yield Question_1.Question.create(questions);
            return createdQuestions;
        });
    }
}
exports.QuestionRepo = QuestionRepo;
//# sourceMappingURL=question.repo.js.map
//# debugId=57d7833b-0c4f-5642-8e52-c42ad43f0a11
