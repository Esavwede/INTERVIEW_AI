"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8396ee20-221a-5e7e-a7d3-a21d3a4dd932")}catch(e){}}();

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
exports.JobProfileRepo = void 0;
const JobProfile_1 = __importDefault(require("@src/models/JobProfile"));
class JobProfileRepo {
    constructor() {
    }
    create(userId, jobProfileDoc, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = { userId, jobProfiles: jobProfileDoc };
            yield JobProfile_1.default.create(doc);
            childLogger.debug("JOB_PROFILE_REPO: Job Profile Created");
        });
    }
    addNew(userId, jobProfileDoc, childLogger) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield JobProfile_1.default.updateOne({ userId }, { $push: { jobProfiles: jobProfileDoc } });
            childLogger.debug("JOB_PROFILE_REPO: ADDED NEW JOB PROFILE TO USER JOB PROFILES");
            return modifiedCount;
        });
    }
    getUserJobProfiles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield JobProfile_1.default.findOne({ userId }).select("jobProfiles").lean();
            if (!result)
                return;
            if (result.jobProfiles.length === 0)
                return null;
            return result.jobProfiles;
        });
    }
    updateJobProfileEntry(userId, updateDoc) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteProfileFromProfiles(userId, jobProfileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield JobProfile_1.default.updateOne({ userId }, { $pull: { jobProfiles: { _id: jobProfileId } } });
            return modifiedCount;
        });
    }
}
exports.JobProfileRepo = JobProfileRepo;
//# sourceMappingURL=jobProfile.repo.js.map
//# debugId=8396ee20-221a-5e7e-a7d3-a21d3a4dd932
