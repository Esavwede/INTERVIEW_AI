

import { config } from "dotenv";
config();
import { createClient, RedisClientType } from "redis";
import logger from "@src/system/logger/logger";
import { Request, Response, NextFunction } from "express-serve-static-core";


let RedisClient: RedisClientType<any> | undefined;
let setCache: ((key: string, data: {} | string ) => Promise<void>) | undefined;


export async function initializeRedis() {
  try {

    logger.info('Initializing Redis Client ') 

    // Initialize Redis Client
    RedisClient =  createClient({
      password: process.env.REDIS_PASSWORD || '' ,
      socket: {
          host: 'redis-13227.c245.us-east-1-3.ec2.redns.redis-cloud.com',
          port: 13227
      }
  });

    // Error Event Listener
    RedisClient.on("error", (err) => console.error("Redis Client Error", err));
    RedisClient.on("connection",()=>{ logger.info("Redis Client Initialized" )})


    // Connect to the Redis server
    await RedisClient.connect();


    // Cache middleware to check Redis for cached data
    const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
      const key = req.originalUrl;

      try {
        // Check Redis for cached data
        const cachedData = await RedisClient?.get(key);

        if (cachedData) {
          // If cached data is found, send it as the response
          return res.status(200).json(JSON.parse(cachedData));
        } else {
          // Otherwise, proceed to the next middleware/route handler
          next();
        }
      } catch (err) {
        console.error("Redis cache error:", err);
        next();
      }
    };

    // Function to set cache with expiration time
    setCache = async (key: string, data: {} ) => {
      try {
        const ttl = 3600; // Cache expiration time in seconds
        await RedisClient?.setEx(key, ttl, JSON.stringify(data)); // Cache data with expiration
      } catch (err) {
        console.error("Error setting cache:", err);
      }
    };

    
    logger.info("Redis client successfully connected.");
    return { RedisClient, setCache };
  } catch (e: any) {
    logger.error(e, "Redis Initialization Error");
  }
}

// Initialize Redis on startup
initializeRedis().catch((e) => logger.error(e, "Failed to initialize Redis"));

// Export RedisClient and setCache to be used in other parts of the application
export { RedisClient, setCache };
