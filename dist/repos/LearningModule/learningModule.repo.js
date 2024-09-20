"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f0bf1fbc-fd9d-5cba-96e6-c0d4982b0088")}catch(e){}}();

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
const LearningModule_1 = require("@src/models/LearningModule");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class LearningModuleRepo {
    constructor() {
    }
    create(learningModuleDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningModule = yield LearningModule_1.LearningModule.create(learningModuleDoc);
                return { learningModuleId: learningModule._id, title: learningModule.title, stage: learningModule.stage };
            }
            catch (e) {
                logger_1.default.error(e, "RepoError: Create Learning Module");
                return false;
            }
        });
    }
    get(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningModule = yield LearningModule_1.LearningModule.findById(moduleId).select('title description area stage imgSrc').lean();
                if (!learningModule) {
                    return false;
                }
                return learningModule;
            }
            catch (e) {
                logger_1.default.error(e, `REPO ERROR: COULD NOT GET MODULE WITH ID ${moduleId}`);
                return false;
            }
        });
    }
    update(moduleID, moduleFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield LearningModule_1.LearningModule.updateOne({ _id: moduleID }, moduleFields, { rawResult: true });
            logger_1.default.info(`Repo: Module Modified: ${modifiedCount} `);
            return modifiedCount;
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield LearningModule_1.LearningModule.deleteOne({ _id }).lean();
            return deletedCount;
        });
    }
    getUserLearningOverview(userId, learningModuleId, currentPartIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLearningOverview = yield LearningModule_1.LearningModule.findOne({ _id: userId, "learningProfile._id": learningModuleId }, { "learningProfile.$": 1 });
            console.log(' ----Here ---');
            console.dir(userLearningOverview);
        });
    }
    getNextPart(moduleId, nextPartIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Getting Learning Module Next Part');
            const result = yield LearningModule_1.LearningModule.findById(moduleId).select('parts').lean();
            if (!result)
                return null;
            const { parts } = result;
            console.log('-----');
            console.dir(parts);
            if (parts) {
                if (!parts[nextPartIndex]) {
                    logger_1.default.info(` Part: ${nextPartIndex} does not exist on Module: ${moduleId} `);
                    return null;
                }
                return parts[nextPartIndex];
            }
            return null;
        });
    }
    incrementNumberOfParts(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LearningModule_1.LearningModule.updateOne({ _id: moduleId }, { $inc: { totalParts: 1 } });
        });
    }
    decrementNumberOfParts(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LearningModule_1.LearningModule.updateOne({ _id: moduleId }, { $inc: { totalParts: -1 } });
        });
    }
    getLearningModulesUnderStage(stageId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = '_id title area description imgSrc stage totalParts';
            var skip = (page - 1) * limit;
            const learningModules = yield LearningModule_1.LearningModule.find({ stage: stageId })
                .select(fields)
                .skip(skip)
                .limit(limit);
            if (learningModules.length === 0)
                return null;
            return learningModules;
        });
    }
}
exports.default = LearningModuleRepo;
//# sourceMappingURL=learningModule.repo.js.map
//# debugId=f0bf1fbc-fd9d-5cba-96e6-c0d4982b0088
