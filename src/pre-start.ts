/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';


// **** Types **** //

interface IArgs {
  env: string;
}


// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

var result2: any = undefined 

if( args.env === "production")
{
    result2 = dotenv.config({
      path: `./${args.env}.env`,
    });
    if (result2.error) {
      throw result2.error;
    }
}
else 
{
      // Set the env file
    result2 = dotenv.config({
      path: path.join(__dirname, `../env/${args.env}.env`),
    });
    if (result2.error) {
      throw result2.error;
    }
}




