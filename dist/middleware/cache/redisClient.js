"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2d123271-3040-53a9-bb45-2414133aba4e")}catch(e){}}();

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
exports.startRedis = startRedis;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function startRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Debugger---Redis");
            const REDIS_USERNAME = process.env.REDIS_USERNAME || "localhost";
            const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "*******";
            const REDIS_HOST = process.env.REDIS_HOST || "localhost";
            const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
            let RedisClient = new ioredis_1.default({
                username: REDIS_USERNAME,
                password: REDIS_PASSWORD,
                host: REDIS_HOST,
                port: REDIS_PORT,
            });
            RedisClient.on("error", (err) => console.error("Redis Client Error", err));
            RedisClient.on("connect", () => {
                logger_1.default.info("Redis Client Initialized");
            });
            yield RedisClient.connect();
            console.log("Debugger----Redis client connected");
            return RedisClient;
        }
        catch (e) {
            logger_1.default.error(e, "Redis Initialization Error");
        }
    });
}
//# sourceMappingURL=redisClient.js.map
//# debugId=2d123271-3040-53a9-bb45-2414133aba4e
