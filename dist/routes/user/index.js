"use strict";
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
const router = (0, express_1.Router)();
function userRoutes(app) {
    const userController = new user_1.UserController();
    router.post('/signup', (0, validateRequestSchema_1.validateRequestSchema)(signupSchema_1.SignupSchema), userController.signup.bind(userController));
    router.post('/signin', userController.signin.bind(userController));
    app.use('/api/v1', router);
    logger_1.default.info("USER ROUTES CREATED");
}
