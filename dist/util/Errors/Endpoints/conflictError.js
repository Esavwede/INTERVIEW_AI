"use strict";
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