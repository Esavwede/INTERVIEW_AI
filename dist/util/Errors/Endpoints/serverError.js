"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1cad7b0f-47ae-5717-a6af-1f1f4426d367")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=serverError.js.map
//# debugId=1cad7b0f-47ae-5717-a6af-1f1f4426d367
