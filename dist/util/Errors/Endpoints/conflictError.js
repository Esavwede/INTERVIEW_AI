"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4d09b3f0-3e78-5aef-a0ca-1d5d573c745e")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=conflictError.js.map
//# debugId=4d09b3f0-3e78-5aef-a0ca-1d5d573c745e
