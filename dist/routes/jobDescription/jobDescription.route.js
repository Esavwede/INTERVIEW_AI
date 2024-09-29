"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5d185935-ad4d-5232-8f7a-419a34e39f3e")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.jobDescriptionRoutes = jobDescriptionRoutes;
const express_1 = require("express");
const jobProfile_controller_1 = require("@src/controller/jobProfile/jobProfile.controller");
const tokens_1 = require("@src/util/Auth/tokens");
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const jobProfile_schema_1 = require("@src/schemas/jobProfile/jobProfile.schema");
const router = (0, express_1.Router)();
function jobDescriptionRoutes(app) {
    try {
        const jobProfileController = new jobProfile_controller_1.JobProfileController();
        router.post('/generate', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(jobProfile_schema_1.GenerateJobDescriptionsValidationSchema), jobProfileController.generateJobDescriptions.bind(jobProfileController));
        app.use('/api/v1/jobDescription', router);
    }
    catch (e) {
    }
}
//# sourceMappingURL=jobDescription.route.js.map
//# debugId=5d185935-ad4d-5232-8f7a-419a34e39f3e
