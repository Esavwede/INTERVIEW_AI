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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningProfileRepo = void 0;
const learningProfile_1 = require("@src/models/learningProfile");
class LearningProfileRepo {
    constructor() {
    }
    create(profileDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield learningProfile_1.LearningProfile.create(profileDoc);
        });
    }
    findOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield learningProfile_1.LearningProfile.findOne({ userId }, { _id: 0, userId: 1 }).lean().exec();
            return profile;
        });
    }
}
exports.LearningProfileRepo = LearningProfileRepo;
//# sourceMappingURL=learningProfile.repo.js.map