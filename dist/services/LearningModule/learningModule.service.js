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
exports.LearningModuleService = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const area_1 = require("@src/models/area");
const user_1 = require("../user/user");
const user_repo_1 = require("@src/repos/user/user.repo");
const learningModulePart_repo_1 = require("@src/repos/learningModulePart/learningModulePart.repo");
const learningModulePart_service_1 = require("../learningModulePart/learningModulePart.service");
class LearningModuleService {
    constructor(learningModuleRepo) {
        this.learningModuleRepo = learningModuleRepo;
        const userRepository = new user_repo_1.UserRepository();
        this.userService = new user_1.UserService(userRepository);
        const learningModulePartRepo = new learningModulePart_repo_1.LearningModulePartRepo();
        this.learningModulePartService = new learningModulePart_service_1.LearningModulePartService(learningModulePartRepo);
    }
    create(learningModule) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLearningModule = yield this.learningModuleRepo.create(learningModule);
                if (!newLearningModule) {
                    logger_1.default.error("Learning Module Was Not Created");
                    return false;
                }
                const learningModuleIsDraft = learningModule.isDraft;
                if (learningModuleIsDraft) {
                    logger_1.default.info("Service: Learning Module Draft Created");
                    return newLearningModule;
                }
                else {
                    yield area_1.LearningArea.updateOne({ _id: learningModule.area }, { $push: { learningModulesUnderArea: newLearningModule } });
                    logger_1.default.info("Learning Module Published");
                }
            }
            catch (e) {
                logger_1.default.error(e, 'SERVICE: Error Occured While Creating Learning Module ');
                throw new serverError_1.ServerError('SERVICE: Error Occured While Creating Learning Module ');
            }
        });
    }
    get(learningModuleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningModule = yield this.learningModuleRepo.get(learningModuleId);
            if (!learningModule) {
                return false;
            }
            logger_1.default.info(`SERVICE: Returning Learning Module with Id: ${learningModuleId}`);
            return learningModule;
        });
    }
    update(moduleId, learningModuleFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modifiedCount = yield this.learningModuleRepo.update(moduleId, learningModuleFields);
                if (!modifiedCount) {
                    throw new notFoundError_1.NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ID: ${moduleId}`);
                }
            }
            catch (e) {
                throw new serverError_1.ServerError(`SERVICE: "SERVER_ERROR" : Could Not Update Learning Module With ID: ${moduleId}`);
            }
        });
    }
    delete(moduleID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteCount = yield this.learningModuleRepo.delete(moduleID);
                if (deleteCount !== 1) {
                    logger_1.default.error(`SERVICE_ERROR: DELETE_LEARNING_MODULE --> COULD NOT FIND LEARNING MODULE WITH ${moduleID} FOR DELETION `);
                    throw new notFoundError_1.NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ${moduleID} FOR DELETION `);
                }
                return;
            }
            catch (e) {
                throw new serverError_1.ServerError("SERVER ENCOUNTERED ERROR WHILE DELETING LEARNING MODULE");
            }
        });
    }
    publish(learningModuleId, learningModule) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modifiedCount = yield this.learningModuleRepo.update(learningModuleId, { isDraft: false });
                if (!modifiedCount) {
                    logger_1.default.error("Did not Find Module To Publish");
                    throw new notFoundError_1.NotFoundError(`COULD NOT FIND LEARNING MODULE WITH ID: ${learningModuleId} to Publish`);
                }
                const updatedData = yield area_1.LearningArea.updateOne({ _id: learningModule.area }, { $push: { learningModulesUnderArea: learningModule } });
                console.dir(updatedData);
                logger_1.default.info("Learning Module Published");
            }
            catch (e) {
                logger_1.default.error(e, `Service: Error While Publishing Learning Module `);
                throw e;
            }
        });
    }
    getPart(userId, learningModuleId, partNumber, totalParts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (partNumber > totalParts || partNumber < 1) {
                    logger_1.default.error(`Part : ${partNumber} does not exist on Learning Module: ${learningModuleId} `);
                    throw new notFoundError_1.NotFoundError(`Part ${partNumber} does not exit on Module`);
                }
                var nextPartIndex = partNumber - 1;
                const learningModulePart = yield this.learningModuleRepo.getNextPart(learningModuleId, nextPartIndex);
                if (!learningModulePart) {
                    logger_1.default.error(`Could Not Find Part: ${nextPartIndex} of Module: ${learningModuleId} `);
                    throw new notFoundError_1.NotFoundError("Could not find learning module part ");
                }
                yield this.userService.updateLearningModuleCurrentPart(userId, learningModuleId, nextPartIndex);
                return learningModulePart;
            }
            catch (e) {
                logger_1.default.error(e, `Learning Module Service: Error Occured While getting next part of Learning Module: ${learningModuleId}`);
                throw e;
            }
        });
    }
    incrementNumberOfParts(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.learningModuleRepo.incrementNumberOfParts(moduleId);
        });
    }
    decrementNumberOfParts(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.learningModuleRepo.incrementNumberOfParts(moduleId);
        });
    }
}
exports.LearningModuleService = LearningModuleService;
//# sourceMappingURL=learningModule.service.js.map