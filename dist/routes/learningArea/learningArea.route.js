"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0944efa5-d6fc-5148-b6f2-96e1cb802cad")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningAreaRoutes = learningAreaRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const learningArea_controller_1 = require("@src/controller/learningArea/learningArea.controller");
const learningArea_schema_1 = require("@src/schemas/learningArea/learningArea.schema");
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const router = (0, express_1.Router)();
function learningAreaRoutes(app) {
    try {
        const learningAreaController = new learningArea_controller_1.LearningAreaController();
        router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(learningArea_schema_1.CreateLearningAreaValidationSchema), learningAreaController.create.bind(learningAreaController));
        router.get('/', learningAreaController.getAll.bind(learningAreaController));
        router.delete('/:id', (0, validateRequestSchema_1.validateRequestSchema)(learningArea_schema_1.DeleteLearningAreaValidationSchema), learningAreaController.delete.bind(learningAreaController));
        app.use('/api/v1/learning-area', router);
        logger_1.default.info("LEARNING AREA Routes Built");
    }
    catch (e) {
        logger_1.default.error(e, "LEARNING AREA ROUTE ERROR");
    }
}
//# sourceMappingURL=learningArea.route.js.map
//# debugId=0944efa5-d6fc-5148-b6f2-96e1cb802cad
