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
exports.UserRepository = void 0;
const User_1 = require("../../models/User");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var newUser = yield User_1.User.create(user);
            var userObject = { _id: newUser._id };
            return userObject;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email }, { _id: 0, email: 1, password: 1 });
                return user;
            }
            catch (e) {
                logger_1.default.error(e, 'DATABASE ERROR');
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
