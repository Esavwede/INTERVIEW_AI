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
exports.LearningModuleController = void 0;
const learningModule_service_1 = require("@src/services/LearningModule/learningModule.service");
const learningModule_repo_1 = __importDefault(require("@src/repos/LearningModule/learningModule.repo"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
class LearningModuleController {
    constructor() {
        const learningModuleRepo = new learningModule_repo_1.default();
        this.learningModuleService = new learningModule_service_1.LearningModuleService(learningModuleRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Creating Learning Module");
                const body = req.body;
                const newLearningModule = yield this.learningModuleService.create(body);
                if (!newLearningModule) {
                    return res.status(500).json({ success: false, msg: "SERVER ERROR" });
                }
                return res.status(201).json({ success: true, msg: "Learning MODULE CREATED", data: newLearningModule });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ success: false, msg: "SERVER ERROR" });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Fetching Learning Module");
                const learningModule = yield this.learningModuleService.get(req.params.id);
                if (!learningModule) {
                    return res.status(404).json({ success: false, msg: "SERVER ERROR" });
                }
                return res.status(200).json({ success: true, msg: "Learning MODULE FETCHED", data: learningModule });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ success: false, msg: "SERVER ERROR" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningModuleId = req.params.id;
                const updateBody = req.body;
                yield this.learningModuleService.update(learningModuleId, updateBody);
                logger_1.default.info("Learning Module Updated");
                return res.status(200).json({ success: true, msg: "LEARNING MODULE UPDATED" });
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
                return res.status(500).json({ success: false, msg: "SERVER ERROR" });
            }
        });
    }
    publish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Controller: ublishing Learning Module`);
                const moduleId = req.params.id;
                const moduleContent = req.body;
                yield this.learningModuleService.publish(moduleId, moduleContent);
                return res.status(200).json({ success: true, msg: "Learning Module Publish Successfully" });
            }
            catch (e) {
                const err = e;
                logger_1.default.error(err, "--Debug--");
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(err.statusCode).json({ success: false, msg: err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.learningModuleService.delete(req.params.id);
                return res.status(200).json({ success: true, msg: "Successfully Deleted Learning Module" });
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
                return res.status(500).json({ success: false, msg: e.message });
            }
        });
    }
    getPart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return res.status(400).json({ success: false, msg: "could not authenticate user" });
                }
                const learningModuleId = req.params.moduleId;
                const partNumber = Number(req.params.partNumber);
                const totalParts = Number(req.query.totalParts);
                const part = yield this.learningModuleService.getPart(userId, learningModuleId, partNumber, totalParts);
                return res.status(200).json({ success: true, data: { part } });
            }
            catch (e) {
                const err = e;
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(err.statusCode).json({ success: false, msg: err.message });
            }
        });
    }
}
exports.LearningModuleController = LearningModuleController;
//# sourceMappingURL=learningModule.controller.js.map