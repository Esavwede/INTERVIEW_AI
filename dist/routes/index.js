"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const user_1 = require("./user");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function routes(app) {
    try {
        (0, user_1.userRoutes)(app);
        logger_1.default.info("API ROUTES CREATED");
    }
    catch (e) {
        console.log("API ROUTES ERROR");
        console.log(e);
    }
}
