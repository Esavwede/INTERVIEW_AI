"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5f5f020d-1b59-567a-b3d2-bf314a19fb5a")}catch(e){}}();

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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const User_1 = require("@src/models/User");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const user_repo_1 = require("@src/repos/user/user.repo");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const userRepo = new user_repo_1.UserRepository();
const authCredentials = {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
};
function authCallBack(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            var email = profile.emails[0].value;
            const user = yield userRepo.findByEmail(email);
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                logger_1.default.info("SIGNIN_WITH_GOOGLE: New User Login");
                const firstName = profile.name.givenName;
                const lastName = profile.name.familyName;
                const email = (_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
                const newUserDoc = { firstname: firstName, lastname: lastName, email };
                const newUser = yield User_1.User.create(newUserDoc);
                return done(null, newUser);
            }
            logger_1.default.info("SIGNIN_WITH_GOOGLE: Existing User Login");
            return done(null, user);
        }
        catch (e) {
            logger_1.default.error(e, `SIGNIN WITH GOOGLE ERROR: Could Not Signin User`);
            throw new serverError_1.ServerError("Error Occured while signing in User with google");
        }
    });
}
passport_1.default.use(new passport_google_oauth2_1.Strategy(authCredentials, authCallBack));
exports.default = passport_1.default;
//# sourceMappingURL=signinWithGoogle.js.map
//# debugId=5f5f020d-1b59-567a-b3d2-bf314a19fb5a
