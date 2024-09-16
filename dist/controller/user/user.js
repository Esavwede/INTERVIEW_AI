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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("@src/services/user/user");
const user_repo_1 = require("@src/repos/user/user.repo");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const conflictError_1 = require("@src/util/Errors/Endpoints/conflictError");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const tokens_1 = require("@src/util/Auth/tokens");
class UserController {
    constructor() {
        const userRepository = new user_repo_1.UserRepository();
        this.userService = new user_1.UserService(userRepository);
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`User_Signup_Controller: Signin Up New User`);
                const email = req.body.email;
                const userExists = yield this.userService.findByEmail(email);
                if (userExists) {
                    logger_1.default.info(`User Email: ${email} Taken `);
                    throw new conflictError_1.ConflictError("Account with this email exists");
                }
                const protocol = req.protocol || 'https' || 'http';
                const host = req.get('host') || 'localhost:3000';
                const domain = `${protocol}://${host}`;
                yield this.userService.create(req.body, domain);
                return res.status(201).json({ status: "success", msg: "User Signup Successfull" });
            }
            catch (e) {
                const err = e;
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: "SERVER ERROR" });
                return res.status(err.statusCode).json({ success: false, msg: err.message });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const response = yield this.userService.signin(email, password);
                return res.status(200).json(response);
            }
            catch (e) {
                const err = e;
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(err.statusCode).json({ success: false, message: e.message });
            }
        });
    }
    signinWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var user = req.user;
                console.log(req.user);
                if (!user)
                    return res.status(500).json({ success: false, msg: "User Object Empty" });
                const { _id, firstname, lastname, email, learningProfile, newUser } = user;
                const signDetails = { _id, email, firstname, lastname };
                const accessToken = (0, tokens_1.generateJwtToken)(signDetails);
                const refreshToken = (0, tokens_1.generateJwtToken)(signDetails);
                const newUserReturnData = { user: { newUser: true, firstname, lastname }, tokens: { accessToken, refreshToken } };
                if (newUser) {
                    return res.status(200).json({ success: true, data: newUserReturnData });
                }
                const userReturnData = { user: { newUser: false, userId: _id, firstname, lastname, learningProfile }, tokens: { accessToken, refreshToken } };
                return res.status(200).json({ success: true, data: userReturnData });
            }
            catch (err) {
                const e = err;
                if (!e.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.query.token;
                yield this.userService.verifyUser(userID);
                return res.status(200).json({ success: true, msg: "User Verified" });
            }
            catch (e) {
                const err = e;
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(err.statusCode).json({ success: false, msg: err.message });
            }
        });
    }
    skipOnboarding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return res.status(400).json({ success: false, msg: "could not authenticate user" });
                }
                yield this.userService.setUserNewToFalse(userId);
                return res.status(200).json({ success: true, msg: "Onboarding Skipped" });
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    return res.status(e.statusCode).json({ success: false, msg: e.message });
                }
                return res.status(500).json({ success: false, msg: "Server Error" });
            }
        });
    }
    addLearningModulesToUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId)
                    return res.status(401).json({ success: false, msg: "could not authenticated user" });
                const learningModuleOverview = req.body.learningModules;
                yield this.userService.saveUserLearningModuleOverview(userId, learningModuleOverview);
                return res.status(200).json({ success: true, msg: "Learning Modules Overview Saved to user Learning Profile" });
            }
            catch (e) {
                const err = e;
                if (!err.statusCode)
                    return res.status(500).json({ success: false, msg: 'Server Error' });
                return res.status(err.statusCode).json({ success: false, msg: err.message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map