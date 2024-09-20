"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="af988b52-1bad-5ec7-8ed0-6a29b51c9c78")}catch(e){}}();

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
exports.LearningAreaRepo = void 0;
const area_1 = require("@src/models/area");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class LearningAreaRepo {
    constructor() {
    }
    create(learningAreaDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield area_1.LearningArea.create(learningAreaDoc);
            logger_1.default.info("DATABASE: Created Learning Area ");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield area_1.LearningArea.find({}, { _id: 1, name: 1, learningModulesUnderArea: 1 }).lean();
            return result;
        });
    }
    delete(learningAreaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield area_1.LearningArea.deleteOne({ _id: learningAreaId });
            return deletedCount;
        });
    }
}
exports.LearningAreaRepo = LearningAreaRepo;
//# sourceMappingURL=learningAreas.repo.js.map
//# debugId=af988b52-1bad-5ec7-8ed0-6a29b51c9c78
