"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbiddenError.js.map