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
exports.LearningProfileController = void 0;
const learningProfile_repo_1 = require("@src/repos/learnningProfile/learningProfile.repo");
const learningProfile_service_1 = require("@src/services/learningProfile/learningProfile.service");
class LearningProfileController {
    constructor() {
        const learningProfileRepo = new learningProfile_repo_1.LearningProfileRepo();
        this.learningProfileService = new learningProfile_service_1.LearningProfileService(learningProfileRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { userId } = body;
                const userExists = yield this.learningProfileService.findOne(userId);
                if (userExists) {
                    return res.status(409).json({ success: false, msg: "USER LEARNING PROFILE ALREADY EXISTS" });
                }
                yield this.learningProfileService.create(body);
                return res.status(201).json({ success: true, msg: "LEARNING PROFILE CREATED SUCCESSFULLY" });
            }
            catch (e) {
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
}
exports.LearningProfileController = LearningProfileController;
