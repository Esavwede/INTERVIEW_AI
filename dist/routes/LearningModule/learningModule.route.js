"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e6350145-9d4a-5066-9a99-634b2f0b5ca4")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningModuleRoutes = learningModuleRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const learningModule_controller_1 = require("@src/controller/learningModule/learningModule.controller");
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const learningModule_schema_1 = require("@src/schemas/learningModule/learningModule.schema");
const learningModulePart_controller_1 = require("@src/controller/learningModulePart/learningModulePart.controller");
const learningModule_schema_2 = require("@src/schemas/learningModule/learningModule.schema");
const tokens_1 = require("@src/util/Auth/tokens");
const router = (0, express_1.Router)();
function learningModuleRoutes(app) {
    try {
        const learningModuleController = new learningModule_controller_1.LearningModuleController();
        const learningModulePartController = new learningModulePart_controller_1.LearningModulePartController();
        router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.CreateLearningModuleSchema), learningModuleController.create.bind(learningModuleController));
        router.get('/:id', (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.GetLearningModuleSchema), learningModuleController.get.bind(learningModuleController));
        router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.UpdateLearningModuleSchema), learningModuleController.update.bind(learningModuleController));
        router.delete('/:id', (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.DeleteLearningModuleSchema), learningModuleController.delete.bind(learningModuleController));
        router.get('/', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.GetLearningModulesUnderStageValidationSchema), learningModuleController.getLearningModulesUnderStage.bind(learningModuleController));
        router.get('/:moduleId/parts/:partNumber', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_2.GetLearningModulePartValidationSchema), learningModuleController.getPart.bind(learningModuleController));
        router.patch('/:id/publish', (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.PublishLearningModuleValidationSchema), learningModuleController.publish.bind(learningModuleController));
        app.use('/api/v1/modules', router);
        logger_1.default.info("Learning Module Routes Built");
    }
    catch (e) {
        logger_1.default.error(e, "LEARNING MODULE ROUTES ERROR");
    }
}
//# sourceMappingURL=learningModule.route.js.map
//# debugId=e6350145-9d4a-5066-9a99-634b2f0b5ca4
