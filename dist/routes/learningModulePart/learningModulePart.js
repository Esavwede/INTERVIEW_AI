"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningModulePartRoutes = learningModulePartRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const learningModulePart_schema_1 = require("@src/schemas/learningModulePart/learningModulePart.schema");
const learningModulePart_controller_1 = require("@src/controller/learningModulePart/learningModulePart.controller");
const router = (0, express_1.Router)();
function learningModulePartRoutes(app) {
    try {
        const learningModulePartController = new learningModulePart_controller_1.LearningModulePartController();
        router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(learningModulePart_schema_1.LearningModulePartValidationSchema), learningModulePartController.create.bind(learningModulePartController));
        router.patch('/', (0, validateRequestSchema_1.validateRequestSchema)(learningModulePart_schema_1.UpdateLearningModulePartSchema), learningModulePartController.update.bind(learningModulePartController));
        app.use('/api/v1/part', router);
        logger_1.default.info("Learning Module Part Routes Built");
    }
    catch (e) {
        logger_1.default.error(e, "LEARNING MODULE PART ROUTES ERROR");
    }
}
