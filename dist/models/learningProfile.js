"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="16f95004-8099-52c8-8092-fbd1a36887c6")}catch(e){}}();

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
exports.LearningProfile = exports.LearningModuleOverviewSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.LearningModuleOverviewSchema = new mongoose_1.Schema({
    moduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    area: {
        type: String,
        required: true
    },
    stage: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    description: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    totalParts: {
        type: Number,
        required: true
    },
    currentPart: {
        type: Number,
        required: true,
        default: 1
    },
    nextPart: {
        type: Number,
        required: true,
        default: 1
    }
});
const LearningProfileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    learningModules: {
        type: [exports.LearningModuleOverviewSchema]
    }
});
exports.LearningProfile = mongoose_1.default.model("learningProfile", LearningProfileSchema);
//# sourceMappingURL=learningProfile.js.map
//# debugId=16f95004-8099-52c8-8092-fbd1a36887c6
