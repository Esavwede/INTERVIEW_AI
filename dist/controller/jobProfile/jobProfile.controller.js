"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db8382df-9004-5259-aa21-96f5dfa89a98")}catch(e){}}();

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
exports.JobProfileController = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const jobProfile_service_1 = require("@src/services/jobProfile/jobProfile.service");
const jobProfile_repo_1 = require("@src/repos/jobProfile/jobProfile.repo");
const uploadDocToCloud_1 = require("@src/util/upload/doc/uploadDocToCloud");
class JobProfileController {
    constructor() {
        const jobProfileRepo = new jobProfile_repo_1.JobProfileRepo();
        this.jobProfileService = new jobProfile_service_1.JobProfileService(jobProfileRepo);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const userLogContext = req.context;
                const { jobRole, experienceLevel } = req.body;
                if (!req.file) {
                    return res.status(400).json({ success: false, msg: "Please Input a Valid Resume " });
                }
                if (!userLogContext || !userId) {
                    logger_1.default.warn(`Request Context Missing for User: ${userId}`);
                    return res.status(500).json({ success: false, msg: "Server Error" });
                }
                const childLogger = logger_1.default.child(userLogContext);
                const { public_id, secure_url } = yield (0, uploadDocToCloud_1.uploadFile)((_b = req.file) === null || _b === void 0 ? void 0 : _b.path, childLogger);
                const jobProfileDoc = { jobRole, experienceLevel, resumeUrl: secure_url, resumeId: public_id };
                const userHasCreatedJobProfileBefore = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userHasCreatedFirstJobProfile;
                if (userHasCreatedJobProfileBefore) {
                    childLogger.debug(`User ${userId} has Job profile. Adding new job profile to user job profiles `);
                    yield this.jobProfileService.addNewJobProfileToJobProfiles(userId, jobProfileDoc, childLogger);
                }
                else {
                    childLogger.debug(`User ${userId} does not have an existing Job Profile. Creating new Job profile and adding new JobProfileEntry `);
                    yield this.jobProfileService.createNewJobProfile(userId, jobProfileDoc, childLogger);
                }
                return res.status(201).json({ success: true, msg: "Job Profile Created" });
            }
            catch (err) {
                const e = err;
                if (!e.statusCode) {
                    logger_1.default.error(e, "Unkown_Server_Error");
                    return res.status(500).json({ success: false, msg: "Server Error" });
                }
                console.dir(e);
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
    getUserJobProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const userLogContext = req.context;
                if (!userLogContext)
                    return res.status(500).json({ success: false, msg: "Server Error " });
                const childLogger = logger_1.default.child(userLogContext);
                if (!userId)
                    return res.status(500).json({ success: false, msg: "Server Error " });
                const userJobProfiles = yield this.jobProfileService.getUserJobProfiles(userId, childLogger);
                if (userJobProfiles === null)
                    return res.status(200).json({ success: true, data: { userJobProfiles } });
                if (userJobProfiles)
                    return res.status(200).json({ success: true, data: { userJobProfiles } });
                return res.status(404).json({ success: true, msg: `User Has Not Created Any Job Profile Yet ` });
            }
            catch (e) {
                return res.status(500).json({ success: false, msg: e.message });
            }
        });
    }
    deleteJobProfileFromJobProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const jobProfileId = req.params.id;
                const userLogContext = req.context;
                if (!userLogContext)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                if (!userId || !jobProfileId)
                    return res.status(400).json({ success: false, msg: "Job Profile Id not in request params" });
                const childLogger = logger_1.default.child(userLogContext);
                yield this.jobProfileService.deleteJobProfileEntry(userId, jobProfileId, childLogger);
                return res.status(200).json({ success: true, msg: "Job Profile deleted successfully" });
            }
            catch (err) {
                const e = err;
                if (!e.statusCode)
                    return res.status(500).json({ success: false, msg: "Server Error" });
                return res.status(e.statusCode).json({ success: false, msg: e.message });
            }
        });
    }
}
exports.JobProfileController = JobProfileController;
//# sourceMappingURL=jobProfile.controller.js.map
//# debugId=db8382df-9004-5259-aa21-96f5dfa89a98
