"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseConnection = createDatabaseConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger/logger"));
const config_1 = __importDefault(require("config"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const DB_OPTIONS = config_1.default.get("db.options");
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/mydatabase";
function createDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info("Creating Database Connection");
            const db = mongoose_1.default.connection;
            db.on("connected", () => { logger_1.default.info("Database connection created "); });
            db.on("error", (e) => { logger_1.default.error(e, "database connection error"); });
            yield mongoose_1.default.connect(DB_URI, DB_OPTIONS);
            return db;
        }
        catch (e) {
            logger_1.default.error(e, 'DATABASE CONNECTION ERROR');
            process.exit(1);
        }
    });
}
//# sourceMappingURL=connect.js.map