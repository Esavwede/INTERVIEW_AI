"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8ca8acc8-940f-50eb-88c8-69cda18a4226")}catch(e){}}();

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
exports.Question = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const OptionSchema = new mongoose_1.Schema({
    char: {
        type: String,
        required: true,
        maxlength: 1
    },
    value: {
        type: String,
        required: true
    }
});
const QuestionSchema = new mongoose_1.Schema({
    area: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    stage: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    options: {
        type: [OptionSchema],
        required: true
    },
    answer: {
        type: OptionSchema,
        required: true
    }
}, {
    timestamps: true
});
exports.Question = mongoose_1.default.model('Question', QuestionSchema);
//# sourceMappingURL=Question.js.map
//# debugId=8ca8acc8-940f-50eb-88c8-69cda18a4226
