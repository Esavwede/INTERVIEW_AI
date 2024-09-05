"use strict";
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
        path: path_1.default.join(__dirname, `../etc/secrets/${args.env}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
}
