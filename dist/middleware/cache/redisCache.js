"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3a47b58b-a18f-51ad-8bc4-2174d3f5a27d")}catch(e){}}();

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
exports.setCache = exports.RedisClient = void 0;
exports.initializeRedis = initializeRedis;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redis_1 = require("redis");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
let RedisClient;
let setCache;
function initializeRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info("Initializing Redis Client ");
            exports.RedisClient = RedisClient = (0, redis_1.createClient)({
                username: "default",
                password: process.env.REDIS_PASSWORD || "",
                socket: {
                    host: "redis-11569.c13.us-east-1-3.ec2.redns.redis-cloud.com",
                    port: 18137,
                },
            });
            RedisClient.on("error", (err) => console.error("Redis Client Error", err));
            RedisClient.on("connection", () => {
                logger_1.default.info("Redis Client Initialized");
            });
            yield RedisClient.connect();
            const cacheMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const key = req.originalUrl;
                try {
                    const cachedData = yield (RedisClient === null || RedisClient === void 0 ? void 0 : RedisClient.get(key));
                    if (cachedData) {
                        return res.status(200).json(JSON.parse(cachedData));
                    }
                    else {
                        next();
                    }
                }
                catch (err) {
                    console.error("Redis cache error:", err);
                    next();
                }
            });
            exports.setCache = setCache = (key, data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const ttl = 3600;
                    yield (RedisClient === null || RedisClient === void 0 ? void 0 : RedisClient.setEx(key, ttl, JSON.stringify(data)));
                }
                catch (err) {
                    console.error("Error setting cache:", err);
                }
            });
            logger_1.default.info("Redis client successfully connected.");
            return { RedisClient, setCache };
        }
        catch (e) {
            logger_1.default.error(e, "Redis Initialization Error");
        }
    });
}
initializeRedis().catch((e) => logger_1.default.error(e, "Failed to initialize Redis"));
//# sourceMappingURL=redisCache.js.map
//# debugId=3a47b58b-a18f-51ad-8bc4-2174d3f5a27d
