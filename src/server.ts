/**
 * Setup express server.
 */
import { config } from "dotenv"
config()

import cors from "cors" 
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';


import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';
import { NodeEnvs } from '@src/common/misc';
import { routes } from './routes';


const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret))



// Cors 
app.use(cors({
  origin: '*', // Allows all origins, you can restrict this to specific origins
}));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
routes(app) 



// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});



// **** Front-End Content **** //

// // Set views directory (html)
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.status(200).json({ success: true, "msg":"Welcome to the Interview AI API"})
});

// Redirect to login if not logged in.
app.get('/users', (_: Request, res: Response) => {
  throw new Error("Sample Error") 
  return res.status(200).json({ success: true, "msg":"Welcome to the Interview AI API"})
});


// **** Export default **** //

export default app;
