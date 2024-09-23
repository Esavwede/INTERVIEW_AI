"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bdaa3df9-2f40-5111-86a8-6284ca11dfe0")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningArea = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LearningModuleUnderAreaSchema = new mongoose_1.Schema({
    learningModuleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    stageName: {
        type: String,
        required: true
    },
    stageNumber: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    area: {
        type: String
    },
    totalParts: {
        type: Number,
        required: true,
        default: 0
    },
    imgSrc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const LearningAreaSchema = new mongoose_1.Schema({
    area: {
        type: String,
        required: true,
        unique: true
    },
    learningModulesUnderArea: {
        type: [LearningModuleUnderAreaSchema]
    }
});
exports.LearningArea = mongoose_1.default.model("learningArea", LearningAreaSchema);
//# sourceMappingURL=area.js.map
//# debugId=bdaa3df9-2f40-5111-86a8-6284ca11dfe0
