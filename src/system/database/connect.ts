
import mongoose,{ connect} from "mongoose";
import logger from "../logger/logger";
import appConfig from "config" 
import { config } from "dotenv"
import { log } from "console";
config() 

interface I_DB_OPTIONS { }
const DB_OPTIONS: I_DB_OPTIONS = appConfig.get("db.options") 
const DB_URI: string = process.env.DB_URI || "mongodb://localhost:27017/mydatabase"

export async function createDatabaseConnection(): Promise<mongoose.Connection>
{
    try 
    {
        logger.info("Creating Database Connection")
        const db = mongoose.connection 

        db.on("connected",()=>{ logger.info("Database connection created ")} )
        db.on("error",(e)=>{ logger.error(e,"database connection error")} )

        await mongoose.connect( DB_URI, DB_OPTIONS )
        return db
    }
    catch(e: any)
    {   
        logger.error(e,'DATABASE CONNECTION ERROR')
        process.exit(1) 
    }
}