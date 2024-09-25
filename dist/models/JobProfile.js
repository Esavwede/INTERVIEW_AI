"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5c3755fd-a709-5aef-bd09-ca01bca37134")}catch(e){}}();

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
const mongoose_1 = __importStar(require("mongoose"));
const GeneratedJobRoleSchema = new mongoose_1.Schema({
    roleContent: {
        type: String,
        required: true
    }
});
const JobProfileEntrySchema = new mongoose_1.Schema({
    jobRole: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    resumeId: {
        type: String,
        required: true
    }
});
const JobProfileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    jobProfiles: {
        type: [JobProfileEntrySchema]
    },
    generatedJobRoles: {
        type: [GeneratedJobRoleSchema]
    }
});
const JobProfile = mongoose_1.default.model("jobProfile", JobProfileSchema);
exports.default = JobProfile;
//# sourceMappingURL=JobProfile.js.map
//# debugId=5c3755fd-a709-5aef-bd09-ca01bca37134
