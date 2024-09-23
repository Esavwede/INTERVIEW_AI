"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="16e9ec10-5359-5c4c-b258-93db92510100")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.jobProfileRoutes = jobProfileRoutes;
const express_1 = require("express");
const jobProfile_controller_1 = require("@src/controller/jobProfile/jobProfile.controller");
const tokens_1 = require("@src/util/Auth/tokens");
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const jobProfile_schema_1 = require("@src/schemas/jobProfile/jobProfile.schema");
const logContext_1 = require("@src/middleware/context/logContext");
const uploadDocToServer_1 = require("@src/util/upload/doc/uploadDocToServer");
const checkRequestDefined_1 = require("@src/middleware/checkRequestDefined/checkRequestDefined");
const router = (0, express_1.Router)();
function jobProfileRoutes(app) {
    try {
        const jobProfileController = new jobProfile_controller_1.JobProfileController();
        router.post('/', tokens_1.validateRequestToken, uploadDocToServer_1.uploadToServer.single('resume'), (0, validateRequestSchema_1.validateRequestSchema)(jobProfile_schema_1.CreateJobProfileValidationSchema), logContext_1.addUserContext, jobProfileController.create.bind(jobProfileController));
        router.get('/', tokens_1.validateRequestToken, logContext_1.addUserContext, checkRequestDefined_1.ensureRequestDefined, jobProfileController.getUserJobProfiles.bind(jobProfileController));
        router.delete('/:id', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(jobProfile_schema_1.DeleteJobProfileValidationSchema), logContext_1.addUserContext, jobProfileController.deleteJobProfileFromJobProfiles.bind(jobProfileController));
        app.use('/api/v1/job-profiles', router);
    }
    catch (e) {
    }
}
//# sourceMappingURL=jobProfile.route.js.map
//# debugId=16e9ec10-5359-5c4c-b258-93db92510100
