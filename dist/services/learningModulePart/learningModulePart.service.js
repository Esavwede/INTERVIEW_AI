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
exports.LearningModulePartService = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const learningModule_repo_1 = __importDefault(require("@src/repos/LearningModule/learningModule.repo"));
class LearningModulePartService {
    constructor(learningModulePartRepo) {
        this.learningModulePartRepo = learningModulePartRepo;
        const learningModuleRepo = new learningModule_repo_1.default();
        this.learningModuleRepo = learningModuleRepo;
    }
    create(learningModuleID, part) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.learningModulePartRepo.create(learningModuleID, part);
                yield this.learningModuleRepo.incrementNumberOfParts(learningModuleID);
                logger_1.default.info("NEW PART ADDED TO LEARNING MODULE");
            }
            catch (e) {
                logger_1.default.error(e, 'DATABASE_ERROR: Error Occured While Adding Part to Learning Module ');
                throw new serverError_1.ServerError("SERVER_ERROR: Error Occured While Adding Part to Learning Module ");
            }
        });
    }
    find(moduleID, partIndexString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var partIndex = Number(partIndexString);
                logger_1.default.info("SERVICE: Getting Learning Module Part ");
                console.log(` Typeof partIndex: ${typeof partIndex}`);
                const part = yield this.learningModulePartRepo.find(moduleID, partIndex);
                if (!part) {
                    logger_1.default.error(`Did not find part: ${partIndex} in  ModuleID: ${moduleID}`);
                    throw new notFoundError_1.NotFoundError(`Did not find part: ${partIndex} in  ModuleID: ${moduleID}`);
                }
                console.log('here');
                console.dir(part);
                return part[0];
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    throw e;
                }
                logger_1.default.error(e, `DATABASE ENCOUNTERED ERROR WHILE FINDING PART NO: ${partIndexString}`);
                throw new serverError_1.ServerError(`SERVER ENCOUNTERED ERROR WHILE FINDING PART NO: ${partIndexString}`);
            }
        });
    }
    update(learningModuleID, updateDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield this.learningModulePartRepo.update(learningModuleID, updateDoc);
                if (!updated) {
                    logger_1.default.error("Failed to Update Part ");
                    throw new Error("FAILED TO UPDATE MODULE PART");
                }
                return;
            }
            catch (e) {
                logger_1.default.error(e, 'Error Occured while updating Learning Module Part');
                throw new serverError_1.ServerError("Error Occured while updating Learning Module Part");
            }
        });
    }
}
exports.LearningModulePartService = LearningModulePartService;
//# sourceMappingURL=learningModulePart.service.js.map