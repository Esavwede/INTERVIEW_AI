"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db38b6a0-6ff9-5b6c-8361-4ec9562aa751")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const ts_command_line_args_1 = require("ts-command-line-args");
const args = (0, ts_command_line_args_1.parse)({
    env: {
        type: String,
        defaultValue: 'development',
        alias: 'e',
    },
});
var result2 = undefined;
if (args.env === "production") {
    result2 = dotenv_1.default.config({
        path: `./${args.env}.env`,
    });
    if (result2.error) {
        throw result2.error;
    }
}
else {
    result2 = dotenv_1.default.config({
        path: path_1.default.join(__dirname, `../env/${args.env}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
}
//# sourceMappingURL=pre-start.js.map
//# debugId=db38b6a0-6ff9-5b6c-8361-4ec9562aa751
