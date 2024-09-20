"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f49df064-fccc-533d-8e00-7e78036279c9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
const devLogger = (0, pino_1.default)({
    level: config_1.default.get("logger.level"),
    redact: {
        paths: ['password'],
        remove: true
    }
});
exports.default = devLogger;
//# sourceMappingURL=index.js.map
//# debugId=f49df064-fccc-533d-8e00-7e78036279c9
