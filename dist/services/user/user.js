"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9195b8cc-2534-5f19-a6b2-3febff653e7c")}catch(e){}}();

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
const forbiddenError_1 = require("@src/util/Errors/Endpoints/forbiddenError");
(0, dotenv_1.config)();
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.debug('Create User Service: Creating new user...');
                const { email } = user;
                const userId = yield this.userRepository.create(user);
                logger_1.default.debug('Create User Service: User created. UserId:' + userId);
                const verificationLink = `${domain}/api/v1/users/verify?token=${userId}`;
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
                logger_1.default.info('Create User Service: Verification mail sent to user: ' + userId);
            }
            catch (e) {
                logger_1.default.error(e, `Create User Service: Error occured while creating New User `);
                throw new serverError_1.ServerError(e.message);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (user) {
                    logger_1.default.info('Find By Email Service: Found User With Email. UserId: ' + user._id);
                    return user;
                }
                logger_1.default.info('No User With Email');
                return null;
            }
            catch (e) {
                logger_1.default.error(e, `User_Service: Error Occured While Finding User By Email: ${email}`);
                throw e;
            }
        });
    }
    update(userId, updateBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield this.userRepository.update(userId, updateBody);
                if (!updateResult) {
                    throw new serverError_1.ServerError("Server Could Not Update User: " + userId);
                }
                logger_1.default.debug(`User: ${userId} successfully updated `);
            }
            catch (e) {
                logger_1.default.error(e, `Update User Service: Error Occured while Updating User: ${userId}  `);
                throw e;
            }
        });
    }
    verifyUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userVerified = yield this.userRepository.markUserAsVerified(userID);
                if (!userVerified) {
                    logger_1.default.error(`Could not find user with ID: ${userID} for verification `);
                    return new unauthorizedError_1.UnauthorizedError("Invalid Validation Link");
                }
                logger_1.default.info(`Verify Email Service: User: ${userID} email verified`);
            }
            catch (e) {
                logger_1.default.error(e, 'Verify User Service: Error Occured while verifying user:  ' + userID);
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
                if (!user.isVerified) {
                    logger_1.default.info(`Signin Service: User: ${user._id} email unverified. Cannot Signin to dashboard`);
                    throw new forbiddenError_1.ForbiddenError(`EMAIL NOT VERIFIED`);
                }
                const passwordValid = yield user.comparePassword(password);
                if (!passwordValid) {
                    logger_1.default.warn(`Sigin Service: User: ${user._id}'s provided password incorrect`);
                    throw new unauthorizedError_1.UnauthorizedError("Password Invalid");
                }
                const { _id, firstname, lastname, learningProfile, userHasCreatedFirstJobProfile } = user;
                const payload = { _id, userHasCreatedFirstJobProfile };
                const accessToken = (0, tokens_1.generateJwtToken)(payload);
                const refreshToken = (0, tokens_1.generateRefreshToken)(payload);
                if (!firstname && !lastname) {
                    return { data: { user: { newUser: false, userId: _id, firstname: null, lastname: null, userHasCreatedFirstJobProfile, learningProfile }, tokens: { accessToken, refreshToken } } };
                }
                return { data: { user: { newUser: false, userId: _id, firstname, lastname, userHasCreatedFirstJobProfile, learningProfile }, tokens: { accessToken, refreshToken } } };
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
    saveUserLearningModuleOverview(userID, learningModuleOverview) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saved = yield this.userRepository.saveLearningModuleOverview(userID, learningModuleOverview);
                if (!saved) {
                    logger_1.default.error(`Could not find User with id: ${userID} to save Learning Summaries `);
                    throw new notFoundError_1.NotFoundError(`Could Not Find User Learning Profile with UserId ${userID}`);
                }
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
                return yield this.userRepository.getLearningModuleOverview(userId, moduleId);
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
    markUserHasCreatedFirstJobProfileAsFalse(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.markUserHasCreatedFirstJobProfileAsFalse(userId);
        });
    }
    markLearningModulePartAsCompleted(userId, learningModuleId, partTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const markedAsCompleted = yield this.userRepository.markLearningModulePartAsCompleted(userId, learningModuleId, partTitle);
                if (!markedAsCompleted) {
                    throw new notFoundError_1.NotFoundError(`Could not find module part: ${partTitle} on user learning profile`);
                }
                logger_1.default.debug('User learning module part marked as complete');
            }
            catch (e) {
                logger_1.default.error(e, 'USER_SERVICE_ERROR: Error occured while marking User learning module part as completed ');
                throw e;
            }
        });
    }
    resendSignupMail(email, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user) {
                    logger_1.default.debug("User not signedup");
                    return false;
                }
                const userId = user._id;
                const verificationLink = `${domain}/api/v1/users/verify?token=${userId}`;
                yield this.sendSignupMail(email, userId, verificationLink);
                return true;
            }
            catch (e) {
                logger_1.default.error(e, "Error occured while resending signup mail");
            }
        });
    }
    sendSignupMail(email, userId, verificationLink) {
        return __awaiter(this, void 0, void 0, function* () {
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
            logger_1.default.info('Create User Service: Verification mail sent to user: ' + userId);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map
//# debugId=9195b8cc-2534-5f19-a6b2-3febff653e7c
