

import { config } from "dotenv";
config();
import { createClient } from "redis";
import logger from "@src/system/logger/logger";


export async function startRedis() {
  try {

    console.log("Debugger---Redis")
      // Initialize Redis Client
      let RedisClient =  createClient({
        password: process.env.REDIS_PASSWORD || '' ,
        socket: {
            host: 'redis-13227.c245.us-east-1-3.ec2.redns.redis-cloud.com',
            port: 13227,
            connectTimeout: 15000
        }
                                  });

      // Error Event Listener
      RedisClient.on("error", (err) => console.error("Redis Client Error", err));
      RedisClient.on("connect",()=>{ logger.info("Redis Client Initialized" )})


      // Connect to the Redis server
      await RedisClient.connect();

      console.log('Debugger----Redis client connected')
      return RedisClient 

  } catch (e: any) {
    logger.error(e, "Redis Initialization Error");
  }
} 