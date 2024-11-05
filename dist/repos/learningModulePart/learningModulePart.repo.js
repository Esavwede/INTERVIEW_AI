"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7dc11925-ef95-51af-8b9b-4cb91432ef46")}catch(e){}}();

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
exports.LearningModulePartRepo = void 0;
const LearningModule_1 = require("@src/models/LearningModule");
class LearningModulePartRepo {
    constructor() {
    }
    create(moduleID, part) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LearningModule_1.LearningModule.findByIdAndUpdate(moduleID, { $addToSet: { parts: part, partsMetaData: { title: part.title } }, $inc: { numberOfParts: 1 } }, { new: false });
        });
    }
    find(_id, partIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield LearningModule_1.LearningModule.findOne({ _id }, { parts: { $slice: [partIndex, 1] }, _id: 0, quizId: 0, title: 0, area: 0, stage: 0, description: 0, imgSrc: 0, numberOfParts: 0 });
            if (!result)
                return null;
            return result.parts;
        });
    }
    update(learningModuleID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield LearningModule_1.LearningModule.updateOne({ _id: learningModuleID }, { $set: { parts: updates } });
            return modifiedCount;
        });
    }
}
exports.LearningModulePartRepo = LearningModulePartRepo;
//# sourceMappingURL=learningModulePart.repo.js.map
//# debugId=7dc11925-ef95-51af-8b9b-4cb91432ef46
