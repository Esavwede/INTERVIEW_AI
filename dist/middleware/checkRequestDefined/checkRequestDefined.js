"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d62d86cc-7c5e-5657-8e9d-fde04606ac81")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureRequestDefined = ensureRequestDefined;
function ensureRequestDefined(req, res, next) {
    if (req.user === undefined)
        return res.status(500).json({ success: false, msg: "Server Error " });
    if (req.context === undefined)
        return res.status(500).json({ success: false, msg: "Server Error " });
    const userLogContext = req.context;
    const user = req.user;
    if (!userLogContext)
        return res.status(500).json({ success: false, msg: "Server Error " });
    if (!user)
        return res.status(500).json({ success: false, msg: "Server Error " });
    return next();
}
//# sourceMappingURL=checkRequestDefined.js.map
//# debugId=d62d86cc-7c5e-5657-8e9d-fde04606ac81
