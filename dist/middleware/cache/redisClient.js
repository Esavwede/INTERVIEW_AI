"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="eaa191d8-ef91-5dd5-a03a-2a018b467c48")}catch(e){}}();

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
const redis_1 = require("redis");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function startRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Debugger---Redis");
            let RedisClient = (0, redis_1.createClient)({
                password: process.env.REDIS_PASSWORD || '',
                socket: {
                    host: 'redis-13227.c245.us-east-1-3.ec2.redns.redis-cloud.com',
                    port: 13227,
                    connectTimeout: 15000
                }
            });
            RedisClient.on("error", (err) => console.error("Redis Client Error", err));
            RedisClient.on("connect", () => { logger_1.default.info("Redis Client Initialized"); });
            yield RedisClient.connect();
            console.log('Debugger----Redis client connected');
            return RedisClient;
        }
        catch (e) {
            logger_1.default.error(e, "Redis Initialization Error");
        }
    });
}
//# sourceMappingURL=redisClient.js.map
//# debugId=eaa191d8-ef91-5dd5-a03a-2a018b467c48
