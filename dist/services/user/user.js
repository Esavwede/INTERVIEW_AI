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
exports.UserService = void 0;
const sendMain_1 = require("@src/util/mail/sendMain");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const dotenv_1 = require("dotenv");
const unauthorizedError_1 = require("@src/util/Errors/Endpoints/unauthorizedError");
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const tokens_1 = require("@src/util/Auth/tokens");
const area_1 = require("@src/models/area");
const organizeLearningModules_1 = require("@src/util/learningModule/organizeLearningModules");
const forbiddenError_1 = require("@src/util/Errors/Endpoints/forbiddenError");
(0, dotenv_1.config)();
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userRepository.create(user);
                const verificationLink = `${domain}/api/v1/users/verify?token=${newUser._id}`;
                const { email } = user;
                const htmlBody = `<!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="UTF-8">
                                    <title>Email Verification</title>
                                </head>
                                <body>
                                    <p>Welcome to Interview AI!</p>
                                    <p>Please click the link below to verify your email address:</p>
                                    <p><a href="${verificationLink}" style="color: #1a0dab; text-decoration: underline;" target="_blank">Verify Email</a></p>
                                    <p>If you did not request this verification, please ignore this email.</p>
                                </body>
                                </html>
                                `;
                const mailOptions = {
                    email,
                    subject: 'Welcome To Interview AI',
                    text: 'Welcome to InterviewAI. Please visit here to verify',
                    html: htmlBody
                };
                yield (0, sendMain_1.sendMail)(mailOptions);
            }
            catch (e) {
                logger_1.default.error(e, `User_Service: Error occured while creating New User `);
                throw new serverError_1.ServerError(e.message);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`User_Service: Finding User By Email ${email}`);
                return yield this.userRepository.findByEmail(email);
            }
            catch (e) {
                logger_1.default.error(e, `User_Service: Error Occured While Finding User By Email: ${email}`);
                throw e;
            }
        });
    }
    verifyUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(userID);
                if (!user) {
                    logger_1.default.error(`Could not find user with ID: ${userID} from Validation `);
                    return new unauthorizedError_1.UnauthorizedError("Invalid Validation Link");
                }
                user.isVerified = true;
                user.markModified("isVerfied");
                yield user.save();
                return;
            }
            catch (e) {
                if (e instanceof unauthorizedError_1.UnauthorizedError) {
                    throw e;
                }
                logger_1.default.error(e, 'SERVICE: Error Occured while finding user by Id ');
                throw new serverError_1.ServerError("Error Occured While Finding User By Id ");
            }
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findByEmail(email);
                if (!user)
                    throw new unauthorizedError_1.UnauthorizedError(`CHECK SIGNIN DETAILS`);
                logger_1.default.info("User:");
                logger_1.default.info(String(user._id));
                if (!user.isVerified)
                    throw new forbiddenError_1.ForbiddenError(`EMAIL NOT VERIFIED`);
                const passwordValid = yield user.comparePassword(password);
                if (!passwordValid)
                    throw new unauthorizedError_1.UnauthorizedError("Password Invalid");
                const accessToken = (0, tokens_1.generateJwtToken)(user.toObject());
                const refreshToken = (0, tokens_1.generateJwtToken)(user.toObject());
                const { _id, firstname, lastname, learningProfile, newUser } = user;
                if (newUser) {
                    logger_1.default.info("User New");
                    const learningModules = yield area_1.LearningArea.find({});
                    const learningModulesGroupedByStage = (0, organizeLearningModules_1.groupLearningAreasByStage)(learningModules);
                    console.dir(learningModulesGroupedByStage);
                    return { success: true, data: { user: { newUser: true, firstname, lastname }, tokens: { accessToken, refreshToken }, learningModules: learningModulesGroupedByStage } };
                }
                logger_1.default.info('User Not New');
                return { data: { user: { newUser: false, userId: _id, firstname, lastname, learningProfile }, tokens: { accessToken, refreshToken } } };
            }
            catch (e) {
                logger_1.default.error(e, "Service: Signin");
                throw e;
            }
        });
    }
    setUserNewToFalse(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const done = yield this.userRepository.setUserNewToFalse(userID);
                if (!done) {
                    logger_1.default.error(`User_Service: User with Id: ${userID} not Found While trying to update Skip Onboarding `);
                    throw new notFoundError_1.NotFoundError("User Not Found");
                }
            }
            catch (e) {
                logger_1.default.error(`Error Occured while Skipping User onboarding for user: ${userID} `);
                throw new serverError_1.ServerError("Server Error");
            }
        });
    }
    saveUserLearningModuleOverview(userID, learningModuleOverviewArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saved = yield this.userRepository.saveLearningModuleOverview(userID, learningModuleOverviewArray);
                if (!saved) {
                    logger_1.default.error(`Could not find User with id: ${userID} to save Learning Summaries `);
                    throw new notFoundError_1.NotFoundError(`Could Not Find User Learning Profile with UserId ${userID}`);
                }
                logger_1.default.info(saved);
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    throw e;
                }
                logger_1.default.error(e, "Error Occured while Updating User Learning Overview");
                throw new serverError_1.ServerError('SERVER ERROR');
            }
        });
    }
    getLearningModuleOverview(userId, moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningModuleOverview = yield this.userRepository.getLearningModuleOverview(userId, moduleId);
                return learningModuleOverview;
            }
            catch (e) {
                logger_1.default.error(e, 'User Service: Error Occured While Getting User Learning Profile');
                throw e;
            }
        });
    }
    updateLearningModuleCurrentPart(userId, moduleId, currentPartIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.updateLearningModuleCurrentPart(userId, moduleId, currentPartIndex);
            }
            catch (e) {
                logger_1.default.error(e, `User Service Error: Error Occured While Updating User Learning Module Current Stage `);
                throw e;
            }
        });
    }
}
exports.UserService = UserService;
