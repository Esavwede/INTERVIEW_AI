"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="21a36961-7b8f-57f4-8bfb-3cfc1ab441bf")}catch(e){}}();

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
exports.UserRepository = void 0;
const User_1 = require("../../models/User");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var newUser = yield User_1.User.create(user);
            var userObject = { _id: newUser._id };
            return userObject;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ email }, { _id: 1, email: 1, userHasCreatedFirstJobProfile: 1, password: 1, newUser: 1, isVerified: 1, firstname: 1, lastname: 1, learningProfile: 1 });
            if (user) {
                logger_1.default.info(`User_Repo: User Found: ${String(user._id)}`);
                return user;
            }
            logger_1.default.info(`User_Repo: User Not Found `);
            return user;
        });
    }
    update(_id, updateBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield User_1.User.updateOne({ _id }, updateBody, { upsert: false });
            if (!modifiedCount)
                return null;
            return true;
        });
    }
    findById(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByIdAndUpdate({ _id: userID }, { isVerified: true });
            return user;
        });
    }
    setUserNewToFalse(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield User_1.User.updateOne({ _id: userID }, { newUser: false });
            return modifiedCount;
        });
    }
    saveLearningModuleOverview(userID, learningModuleOverview) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matchedCount } = yield User_1.User.updateOne({ _id: userID }, { $push: { learningProfile: learningModuleOverview } });
            return matchedCount;
        });
    }
    getLearningModuleOverview(userId, moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const learningModuleOverview = yield User_1.User.findOne({ _id: userId }, { learningProfile: { $elemMatch: { moduleId: moduleId } } });
            if (!learningModuleOverview) {
                return null;
            }
            return learningModuleOverview.learningProfile[0];
        });
    }
    updateLearningModuleCurrentPart(userId, moduleId, newCurrentPartIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield User_1.User.updateOne({
                _id: userId,
                "learningProfile": { $elemMatch: { moduleId: moduleId } }
            }, {
                $set: { "learningProfile.$.currentPart": newCurrentPartIndex }
            });
            if (update) {
                console.log(update.modifiedCount);
            }
            console.log('-------Here !-----');
            console.log(update);
        });
    }
    markUserHasCreatedFirstJobProfileAsFalse(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield User_1.User.updateOne({ _id: userId }, { userHasCreatedFirstJobProfile: true });
            return modifiedCount;
        });
    }
    markLearningModulePartAsCompleted(userId, learningModuleId, partTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifiedCount } = yield User_1.User.updateOne({
                _id: userId,
                "learningProfile._id": learningModuleId,
                "learningProfile.partsMetaData.title": partTitle
            }, {
                $set: {
                    "learningProfile.$[profile].partsMetaData.$[part].hasBeenCompleted": true
                }
            }, {
                arrayFilters: [
                    { "profile._id": { $exists: true } },
                    { "part.title": partTitle }
                ]
            });
            return modifiedCount;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repo.js.map
//# debugId=21a36961-7b8f-57f4-8bfb-3cfc1ab441bf
