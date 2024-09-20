"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="06cb0c7e-684a-517e-8a5d-db77f42784c3")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErr = exports.RouteError = void 0;
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
class RouteError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.RouteError = RouteError;
class ValidationErr extends RouteError {
    constructor(paramName) {
        super(HttpStatusCodes_1.default.BAD_REQUEST, ValidationErr.GetMsg(paramName));
    }
    static GetMsg(param) {
        return ValidationErr.MSG + param + '".';
    }
}
exports.ValidationErr = ValidationErr;
ValidationErr.MSG = 'The follow parameter were missing or invalid "';
//# sourceMappingURL=classes.js.map
//# debugId=06cb0c7e-684a-517e-8a5d-db77f42784c3
