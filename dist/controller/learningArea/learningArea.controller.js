"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="43b57e14-01e5-5383-bdd8-6f30a12ce788")}catch(e){}}();

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
exports.LearningAreaController = void 0;
const learningAreas_repo_1 = require("@src/repos/learningAreas/learningAreas.repo");
const learningArea_service_1 = require("@src/services/learningArea/learningArea.service");
class LearningAreaController {
    constructor() {
        const learningAreaRepo = new learningAreas_repo_1.LearningAreaRepo();
        this.learningAreaService = new learningArea_service_1.LearningAreaService(learningAreaRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.learningAreaService.create(req.body);
                return res.status(201).json({ success: true, msg: "Learning Area Created Successfully" });
            }
            catch (e) {
                res.status(e.status).json({ success: false, msg: e.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningAreas = yield this.learningAreaService.getAll();
                return res.status(201).json({ success: true, learningAreas });
            }
            catch (e) {
                res.status(e.status).json({ success: false, msg: e.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.learningAreaService.delete(req.params.id);
                return res.status(201).json({ success: true, msg: "Learning Area Deleted Successfully" });
            }
            catch (e) {
                res.status(e.status).json({ success: false, msg: e.message });
            }
        });
    }
}
exports.LearningAreaController = LearningAreaController;
//# sourceMappingURL=learningArea.controller.js.map
//# debugId=43b57e14-01e5-5383-bdd8-6f30a12ce788
