"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0b96f265-4663-508e-99ce-76874cfe42f8")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const signinWithGoogle_1 = __importDefault(require("../googleAuth/signinWithGoogle"));
const signinWithLinkedin_1 = __importDefault(require("../linkedinAuth/signinWithLinkedin"));
passport_1.default.use(signinWithGoogle_1.default);
passport_1.default.use(signinWithLinkedin_1.default);
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map
//# debugId=0b96f265-4663-508e-99ce-76874cfe42f8
