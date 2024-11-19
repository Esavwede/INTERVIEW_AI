"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1e32cfb6-c96d-55c6-9615-557bca7a246a")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const express_1 = require("express");
const logger_1 = __importDefault(require("../../system/logger/logger"));
const signupSchema_1 = require("@src/schemas/user/signupSchema");
const user_1 = require("@src/controller/user/user");
const validateRequestSchema_1 = require("@src/middleware/validate/request/validateRequestSchema");
const onboarding_schema_1 = require("@src/schemas/onboarding/onboarding.schema");
const tokens_1 = require("@src/util/Auth/tokens");
const server_1 = require("@src/server");
const learningModule_schema_1 = require("@src/schemas/learningModule/learningModule.schema");
const mail_schema_1 = require("@src/schemas/mail/mail.schema");
const resetPassword_schema_1 = require("@src/schemas/reset/password/resetPassword.schema");
const router = (0, express_1.Router)();
function userRoutes(app) {
    const userController = new user_1.UserController();
    router.post('/signup', (0, validateRequestSchema_1.validateRequestSchema)(signupSchema_1.SignupSchema), userController.signup.bind(userController));
    router.post('/signin', userController.signin.bind(userController));
    router.patch('/users/update', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(signupSchema_1.SaveUserFirstAndLastNameValidationSchema), userController.update.bind(userController));
    router.get('/users/verify', (0, validateRequestSchema_1.validateRequestSchema)(signupSchema_1.VerifyUserValidationSchema), userController.verifyUser.bind(userController));
    router.patch('/onboarding/skip', tokens_1.validateRequestToken, userController.skipOnboarding.bind(userController));
    router.patch('/onboarding', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(onboarding_schema_1.OnboardingValidationSchema), userController.addLearningModulesToUserProfile.bind(userController));
    router.post('/users/learning-modules', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(learningModule_schema_1.SaveLearningModuleSummaryValidationSchema), userController.addLearningModulesToUserProfile.bind(userController));
    app.get('/auth/google/callback', server_1.passport.authenticate('google', { session: false }), userController.signinWithGoogle.bind(userController));
    router.patch('/learning-profile', (0, validateRequestSchema_1.validateRequestSchema)(onboarding_schema_1.OnboardingValidationSchema), userController.addLearningModulesToUserProfile.bind(userController));
    router.post('/signup/resend-mail', (0, validateRequestSchema_1.validateRequestSchema)(mail_schema_1.ResendSignupMailValidationSchema), userController.reSendSignupMail.bind(userController));
    router.patch('/markLearningModulePartAsComplete', tokens_1.validateRequestToken, (0, validateRequestSchema_1.validateRequestSchema)(signupSchema_1.markLearningModulePartAsCompletedValidationSchema), userController.markUserLearningPartAsComplete.bind(userController));
    router.post('/token', userController.getNewAccessToken.bind(userController));
    router.post('/reset-password/request', (0, validateRequestSchema_1.validateRequestSchema)(resetPassword_schema_1.GetPasswordResetEmailValidationSchema), userController.sendResetPasswordEmail.bind(userController));
    router.post('/reset-password', (0, validateRequestSchema_1.validateRequestSchema)(resetPassword_schema_1.ResetPasswordValidationSchema), userController.resetPassword.bind(userController));
    app.use('/api/v1', router);
    logger_1.default.info("User Routes Created");
}
//# sourceMappingURL=index.js.map
//# debugId=1e32cfb6-c96d-55c6-9615-557bca7a246a
