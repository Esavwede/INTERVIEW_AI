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
exports.LearningModulePartRepo = void 0;
const LearningModule_1 = require("@src/models/LearningModule");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class LearningModulePartRepo {
    constructor() {
    }
    create(moduleID, part) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LearningModule_1.LearningModule.findByIdAndUpdate(moduleID, { $addToSet: { parts: part }, $inc: { numberOfParts: 1 } }, { new: false });
        });
    }
    find(learningModuleId, partIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = learningModuleId;
            const result = yield LearningModule_1.LearningModule.findOne({ _id }, { parts: { $slice: [partIndex, 1] }, _id: 0, quizId: 0, title: 0, area: 0, stage: 0, description: 0, imgSrc: 0, numberOfParts: 0 });
            if (!result) {
                return null;
            }
            logger_1.default.info('--Debug--1');
            logger_1.default.info(result.parts);
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
