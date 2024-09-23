"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6386718b-7eca-5ed7-891f-cec5c9c9c0f7")}catch(e){}}();

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
exports.JobProfileService = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const user_1 = require("../user/user");
const user_repo_1 = require("@src/repos/user/user.repo");
const conflictError_1 = require("@src/util/Errors/Endpoints/conflictError");
class JobProfileService {
    constructor(jobProfileRepo) {
        this.jobProfileRepo = jobProfileRepo;
        const userRepo = new user_repo_1.UserRepository();
        this.userService = new user_1.UserService(userRepo);
    }
    createNewJobProfile(userId, jobProfileDoc, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.jobProfileRepo.create(userId, jobProfileDoc, childLogger);
                yield this.userService.markUserHasCreatedFirstJobProfileAsFalse(userId);
                childLogger.debug("JOB_PROFILE_SERVICE: NEW JOB PROFILE CREATED FOR USER " + userId);
            }
            catch (e) {
                if ((e === null || e === void 0 ? void 0 : e.code) === 11000) {
                    childLogger.error(e, `User Job Profile Exists In Database`);
                    throw new conflictError_1.ConflictError("User Job Profile Exists. Add new Job Profile Entry ");
                }
                childLogger.error(e, `JOB_PROFILE_SERVICE: ERROR OCCURED WHILE CREATING NEW JOB PROFILE FOR USER: ${userId}`);
                throw new serverError_1.ServerError("Server Encountered Error While Creating Job Profile");
            }
        });
    }
    addNewJobProfileToJobProfiles(userId, jobProfileDoc, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modifiedCount = yield this.jobProfileRepo.addNew(userId, jobProfileDoc, childLogger);
                if (modifiedCount !== 1) {
                    logger_1.default.debug(`JOB_PROFILE_SERVICE: USER: ${userId} JOB PROFILE NOT FOUND `);
                    throw new notFoundError_1.NotFoundError(`Job Profile Not Found`);
                }
                childLogger.debug(`NEW JOB PROFILE ADDED TO USER: ${userId} JOB PROFILES `);
            }
            catch (e) {
                childLogger.error(e, `JOB_PROFILE_SERVICE: COULD NOT ADD NEW JOB PROFILE TO USER: ${userId} JOB PROFILES `);
                if (e instanceof notFoundError_1.NotFoundError)
                    throw e;
                throw e;
            }
        });
    }
    getUserJobProfiles(userId, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userJobProfiles = yield this.jobProfileRepo.getUserJobProfiles(userId);
                childLogger.debug(`Job_Profile_Service:    Received User: ${userId} job profiles `);
                childLogger.debug(userJobProfiles);
                return userJobProfiles;
            }
            catch (e) {
                logger_1.default.error(e, `Job_Profile_Service: Could Not Get User Job Profiles`);
                throw new serverError_1.ServerError("Server Error");
            }
        });
    }
    deleteJobProfileEntry(userId, jobProfileId, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.jobProfileRepo.deleteProfileFromProfiles(userId, jobProfileId);
                if (!deleted)
                    throw new notFoundError_1.NotFoundError(`Did Not Find Job Profile with ID: ${jobProfileId} for Deletion`);
                logger_1.default.debug(`Job Profile: ${jobProfileId} Deleted from User: ${userId} learning Profiles `);
            }
            catch (e) {
                logger_1.default.error(e, "error occured while deleting job profile ");
                throw e;
            }
        });
    }
}
exports.JobProfileService = JobProfileService;
//# sourceMappingURL=jobProfile.service.js.map
//# debugId=6386718b-7eca-5ed7-891f-cec5c9c9c0f7
