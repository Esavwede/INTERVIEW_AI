"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b3abcc9a-0c8c-5843-b8b5-5bb145f6b663")}catch(e){}}();

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
exports.LearningModule = exports.PartMetaDataSchema = exports.PartContentSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
const LearningModulePartSchema = new mongoose_1.Schema({
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
const LearningModuleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    stage: {
        type: mongoose_1.default.Types.ObjectId,
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
        required: true,
        default: 0
    },
    partsMetaData: {
        type: [exports.PartMetaDataSchema]
    },
    parts: {
        type: [LearningModulePartSchema]
    },
    isDraft: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});
exports.LearningModule = mongoose_1.default.model('learningModule', LearningModuleSchema);
//# sourceMappingURL=LearningModule.js.map
//# debugId=b3abcc9a-0c8c-5843-b8b5-5bb145f6b663
