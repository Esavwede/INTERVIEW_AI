"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1176f437-de18-5a37-b9eb-7c1c22a805e5")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
const prodLogger = (0, pino_1.default)({
    level: config_1.default.get("logger.level"),
    redact: {
        paths: ['password'],
        remove: true
    }
});
exports.default = prodLogger;
//# sourceMappingURL=index.js.map
//# debugId=1176f437-de18-5a37-b9eb-7c1c22a805e5
