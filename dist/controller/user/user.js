"use strict";
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
exports.UserController = void 0;
const user_1 = require("@src/services/user/user");
const user_repo_1 = require("@src/repos/user/user.repo");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const tokens_1 = require("@src/util/Auth/tokens");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class UserController {
    constructor() {
        const userRepository = new user_repo_1.UserRepository();
        this.userService = new user_1.UserService(userRepository);
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" Signing up user ");
            console.log(process.env.NODE_ENV);
            const userExists = yield this.userService.findByEmail(req.body.email);
            if (userExists) {
                return res.status(409).json({ msg: "Email Taken" });
            }
            const newUser = yield this.userService.create(req.body);
            return res.status(201).json({ status: "success", msg: "user created", data: { newUser } });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const user = yield this.userService.findByEmail(email);
                if (!user) {
                    return res.status(400).json({ msg: "check login details" });
                }
                const passwordValid = yield user.comparePassword(password);
                if (!passwordValid) {
                    return res.status(400).json({ msg: "check login details" });
                }
                const accessToken = (0, tokens_1.generateJwtToken)(user.toObject());
                const refreshToken = (0, tokens_1.generateJwtToken)(user.toObject());
                if (!accessToken || !refreshToken) {
                    return res.status(500).json({ msg: "Server Error" });
                }
                return res.status(200).send({ "msg": "signin successfull", body: { refreshToken, accessToken } });
            }
            catch (e) {
                logger_1.default.error(e, 'SIGNUP ERROR');
                return res.status(500).json({ msg: "server error" });
            }
        });
    }
}
exports.UserController = UserController;
