"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="07ca6553-769c-5af7-a17f-c62b7c70f31c")}catch(e){}}();

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
exports.LearningAreaService = void 0;
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const notFoundError_1 = require("@src/util/Errors/Endpoints/notFoundError");
class LearningAreaService {
    constructor(learningAreaRepository) {
        this.learningAreaRepository = learningAreaRepository;
    }
    create(learningAreaDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("SERVICE: Creating Learning Area");
                yield this.learningAreaRepository.create(learningAreaDoc);
                logger_1.default.info("SERVICE: Learning Area Created");
            }
            catch (e) {
                logger_1.default.error(e, "SERVICE: Error Occured While Creating Learning Area");
                throw new serverError_1.ServerError(" Server Encountered Error While Creating Learning Area");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learningAreas = yield this.learningAreaRepository.getAll();
                return learningAreas;
            }
            catch (e) {
                logger_1.default.error(e, `SERVICE: Error Occured While Fetching Service Areas `);
                throw new serverError_1.ServerError(`SERVICE: Error Occured While Fetching Service Areas `);
            }
        });
    }
    delete(learningAreaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteCount = yield this.learningAreaRepository.delete(learningAreaId);
                if (deleteCount !== 1) {
                    logger_1.default.error(`SERVICE: Could not find Area with ID:${learningAreaId} to delete `);
                    throw new notFoundError_1.NotFoundError(`SERVICE: Could not find Area with ID:${learningAreaId} to delete `);
                }
            }
            catch (e) {
                if (e instanceof notFoundError_1.NotFoundError) {
                    throw e;
                }
                logger_1.default.error(e, `SERVICE: Error Occured While Deleting Area With ID: ${learningAreaId}`);
                throw new serverError_1.ServerError(`SERVICE: Error Occured While Deleting Area With ID: ${learningAreaId}`);
            }
        });
    }
}
exports.LearningAreaService = LearningAreaService;
//# sourceMappingURL=learningArea.service.js.map
//# debugId=07ca6553-769c-5af7-a17f-c62b7c70f31c
