"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e09be115-3663-56e0-a863-34b77b27aaf2")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
const prodLogger = (0, pino_1.default)({
    level: config_1.default.get("logger.level"),
    formatters: {
        level: (label) => { return { level: label }; },
        bindings: (bindings) => { return { env: "production" }; }
    },
    redact: {
        paths: ['password'],
        remove: true
    }
});
exports.default = prodLogger;
//# sourceMappingURL=index.js.map
//# debugId=e09be115-3663-56e0-a863-34b77b27aaf2
