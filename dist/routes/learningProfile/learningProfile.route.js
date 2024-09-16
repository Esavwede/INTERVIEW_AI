"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningProfileRoutes = learningProfileRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const learningProfile_1 = require("@src/controller/learningProfile/learningProfile");
const learningProfile_schema_1 = require("@src/schemas/learningProfile/learningProfile.schema");
const router = (0, express_1.Router)();
function learningProfileRoutes(app) {
    try {
        const learningProfileController = new learningProfile_1.LearningProfileController();
        router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(learningProfile_schema_1.CreateLearningProfileValidationSchema), learningProfileController.create.bind(learningProfileController));
        app.use('/api/v1/learning/profile', router);
        logger_1.default.info("Learning Profile Routes Built");
    }
    catch (e) {
        logger_1.default.error(e, "Learning Profile ROUTE ERROR");
    }
}
//# sourceMappingURL=learningProfile.route.js.map