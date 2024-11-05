"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cd13a7dc-5d0d-5abb-a470-aed3fe089745")}catch(e){}}();

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
exports.LearningModulePartSchema = exports.PartContentSchema = exports.PartMetaDataSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.PartMetaDataSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    hasBeenCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});
exports.PartContentSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
exports.LearningModulePartSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    learningModuleId: {
        type: mongoose_1.default.Types.ObjectId
    },
    quizId: {
        type: String,
        default: ''
    },
    content: {
        type: [exports.PartContentSchema],
        required: true
    },
    isLast: {
        type: Boolean,
        require: true,
        default: false
    }
});
//# sourceMappingURL=learningModulePart.js.map
//# debugId=cd13a7dc-5d0d-5abb-a470-aed3fe089745
