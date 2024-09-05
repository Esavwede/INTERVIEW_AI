"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const index_1 = __importDefault(require("./devLogger/index"));
const index_2 = __importDefault(require("./prodLogger/index"));
console.log(process.env.NODE_ENV);
var logger = index_2.default;
try {
    switch (process.env.NODE_ENV) {
        case "development":
            console.log("Development Logger Created");
            logger = index_1.default;
            break;
        case "production":
            console.log("Production Logger Created");
            logger = index_2.default;
            break;
        default:
            console.log("Unknown Node Environment");
            console.log("Using Default Logger: Production Logger");
            console.log(process.env.NODE_ENV);
    }
}
catch (e) {
    console.log('LOGGER CREATION ERROR');
    console.log(e);
}
exports.default = logger;
