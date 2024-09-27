"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c18a415d-2cbf-5911-8b0f-5758ef834254")}catch(e){}}();

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
exports.LearningModulePartController = void 0;
const learningModulePart_service_1 = require("@src/services/learningModulePart/learningModulePart.service");
const learningModulePart_repo_1 = require("@src/repos/learningModulePart/learningModulePart.repo");
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
class LearningModulePartController {
    constructor() {
        const learningModulePartRepo = new learningModulePart_repo_1.LearningModulePartRepo();
        this.learningModulePartService = new learningModulePart_service_1.LearningModulePartService(learningModulePartRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.learningModulePartService.create(req.body.learningModuleId, req.body);
                return res.status(201).json({ success: true, msg: "Learning Module Part Created" });
            }
            catch (e) {
                return res.status(500).json({ success: false, msg: e.message });
            }
        });
    }
    getPart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const part = yield this.learningModulePartService.find(req.params.moduleId, req.params.partNumber);
                return res.status(200).json({ success: true, data: { part } });
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
                return res.status(e.statusCode).json({ success: false, message: e.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { learningModuleId, content } = req.body;
                yield this.learningModulePartService.update(learningModuleId, content);
                return res.status(200).json({ success: true, msg: "Learning Module Part Updated" });
            }
            catch (e) {
                return res.status(500).json({ success: false, msg: "Failed to Update learning module Part " });
            }
        });
    }
}
exports.LearningModulePartController = LearningModulePartController;
//# sourceMappingURL=learningModulePart.controller.js.map
//# debugId=c18a415d-2cbf-5911-8b0f-5758ef834254
