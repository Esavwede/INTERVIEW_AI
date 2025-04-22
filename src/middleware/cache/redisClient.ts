import { config } from "dotenv";
config();

import Redis from "ioredis";
import logger from "@src/system/logger/logger";

export async function startRedis() {
  try {
    console.log("Debugger---Redis");

    const REDIS_USERNAME: string = process.env.REDIS_USERNAME || "localhost";
    const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "*******";
    const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
    const REDIS_PORT: number =
      parseInt(process.env.REDIS_PORT as string) || 6379;

    console.dir("------------------Redis Config-----------------");
    console.log(REDIS_USERNAME);
    console.log(REDIS_PASSWORD);

    // Initialize Redis Client
    let RedisClient = new Redis({
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
      host: REDIS_HOST,
      port: REDIS_PORT,
      connectTimeout: 20000,
      retryStrategy: (times) => {
        const delay = Math.min(1000 * 2 ** times, 30000); // Exponential backoff with a max delay of 30 seconds
        return delay;
      },
    });

    // Error Event Listener
    RedisClient.on("error", (err) => console.error("Redis Client Error", err));
    RedisClient.on("connect", () => {
      logger.info("Redis Client Initialized");
    });

    // Connect to the Redis server
    await RedisClient.connect();

    console.log("Debugger----Redis client connected");
    return RedisClient;
  } catch (e: any) {
    logger.error(e, "Redis Initialization Error");
  }
}
