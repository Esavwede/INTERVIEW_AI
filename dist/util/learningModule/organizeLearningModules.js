"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="019e59bd-fd8f-5e63-b688-b7b7f54f4439")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupLearningAreasByStage = groupLearningAreasByStage;
const serverError_1 = require("../Errors/Endpoints/serverError");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function groupLearningAreasByStage(areas) {
    try {
        const group = (areas) => {
            return areas.reduce((acc, area) => {
                area.learningModulesUnderArea.forEach(module => {
                    if (!acc[module.stage]) {
                        acc[module.stage] = [];
                    }
                    module.area = area.area;
                    acc[module.stage].push(module);
                });
                return acc;
            }, {});
        };
        return group(areas);
    }
    catch (e) {
        logger_1.default.error(e, "Error Occured while Fetching Onboarding Details: learningAreasByStages ");
        throw new serverError_1.ServerError("Error Occured While Fetching Onboarding Details");
    }
}
//# sourceMappingURL=organizeLearningModules.js.map
//# debugId=019e59bd-fd8f-5e63-b688-b7b7f54f4439
