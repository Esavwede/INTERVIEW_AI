"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e5d4eb93-6c0a-5100-8ae6-440658c28b85")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserContext = addUserContext;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uuid_1 = require("uuid");
function addUserContext(req, res, next) {
    var _a, _b;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id))
        return res.status(500).json({ success: false, msg: "Server Error" });
    const context = {
        userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        requestId: (0, uuid_1.v4)(),
        endPoint: req.originalUrl,
        httpMethod: req.method,
        clientIp: req.ip || 'unknown',
        environment: process.env.NODE_ENV,
        userAgent: req.headers['user-agent'],
        timeStamp: new Date().toISOString()
    };
    req.context = context;
    console.log("----Debug-----");
    console.log(req.context);
    next();
}
//# sourceMappingURL=logContext.js.map
//# debugId=e5d4eb93-6c0a-5100-8ae6-440658c28b85
