"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="33977435-3dcd-5059-88fc-9001e76cdab0")}catch(e){}}();

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
exports.LearningProfileService = void 0;
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
class LearningProfileService {
    constructor(learningProfileRepo) {
        this.learningProfileRepo = learningProfileRepo;
    }
    create(learningProfileDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("SERVICE: Creating Learning Profile ");
                yield this.learningProfileRepo.create(learningProfileDoc);
                logger_1.default.info("Learning Profile Created");
            }
            catch (e) {
                logger_1.default.error(e, `SERVICE: Error Occured While Creating Learrning Profile`);
                throw new serverError_1.ServerError(`SERVICE: Error Occured While Creating Learrning Profile`);
            }
        });
    }
    findOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("SERVICE: Finding Learning Profile ");
                const learningProfile = yield this.learningProfileRepo.findOne(userId);
                if (learningProfile) {
                    logger_1.default.info("Learning Profile Already Exists for user with id %s ", userId);
                    logger_1.default.info(learningProfile);
                    return true;
                }
                return false;
            }
            catch (e) {
                logger_1.default.error(e, `SERVICE: Error Occured While Creating Learrning Profile`);
                throw new serverError_1.ServerError(`SERVICE: Error Occured While Creating Learrning Profile`);
            }
        });
    }
}
exports.LearningProfileService = LearningProfileService;
//# sourceMappingURL=learningProfile.service.js.map
//# debugId=33977435-3dcd-5059-88fc-9001e76cdab0
