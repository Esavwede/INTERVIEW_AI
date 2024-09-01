import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/common/EnvVars';
import app from './server';
import { Server, createServer}  from "http" 


// **** Run **** //

const server: Server = createServer(app)
const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());



server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));




process.on("SIGINT", ()=>{  gracefulShutdown() } ) 
process.on("SIGTERM", ()=>{ gracefulShutdown() } )



function gracefulShutdown()
{
  try 
  {
      console.log(' Attempting Graceful Shutdown ')

      server.close(( e?: Error )=>{

          if( e )
          {
            console.log("Error occured while closing the server ")
            console.log(e)
          }

          // Shut down other resources 
          console.log(" Graceful Shutdown Successful ")
          process.exit(0) 
      })


  }
  catch(e)
  {
    console.log("Error occured while attempting graceful shutdown ") 
    console.log(e)
  }
}

