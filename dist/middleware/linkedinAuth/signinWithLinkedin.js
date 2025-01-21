"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a29e8be5-945f-52f2-97f3-4f22b05c7334")}catch(e){}}();

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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const user_repo_1 = require("@src/repos/user/user.repo");
const serverError_1 = require("@src/util/Errors/Endpoints/serverError");
const User_1 = require("@src/models/User");
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';
const UserRepo = new user_repo_1.UserRepository();
const authCredentials = {
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/auth/linkedin/callback',
    scope: ['email'],
    state: true
};
const LinkedinSigninStrategy = new passport_linkedin_oauth2_1.Strategy(authCredentials, authCallback);
function authCallback(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log("----DEBUG%----");
        console.log(profile);
        const { id, displayName, emails } = profile;
        try {
            var email = emails[0].value;
            const user = yield UserRepo.findByEmail(email);
            if (!(user === null || user === void 0 ? void 0 : user._id)) {
                logger_1.default.info("SIGNIN_WITH_: New User Login");
                let firstName = '';
                let lastName = '';
                if (displayName) {
                    const nameParts = displayName.split(' ');
                    firstName = nameParts[0] || '';
                    lastName = nameParts.slice(1).join(' ') || '';
                }
                const email = (_a = emails === null || emails === void 0 ? void 0 : emails[0]) === null || _a === void 0 ? void 0 : _a.value;
                const newUserDoc = { firstname: firstName, lastname: lastName, email };
                const newUser = yield User_1.User.create(newUserDoc);
                return done(null, newUser);
            }
            logger_1.default.info("SIGNIN_WITH_LINKEDIN: Existing User Login");
            return done(null, user);
        }
        catch (e) {
            logger_1.default.error(e, `SIGNIN WITH LINKEDIN ERROR: Could Not Signin User`);
            throw new serverError_1.ServerError("Error Occured while signing in User with LINKEDIN");
        }
    });
}
exports.default = LinkedinSigninStrategy;
//# sourceMappingURL=signinWithLinkedin.js.map
//# debugId=a29e8be5-945f-52f2-97f3-4f22b05c7334
