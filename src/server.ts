/**
 * Setup express server.
 */


// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});


import { config } from "dotenv"
config()

import  compression from "compression"
import cors from "cors" 
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import passport from "./middleware/googleAuth/signinWithGoogle"


import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';
import { NodeEnvs } from '@src/common/misc';
import { routes } from './routes';


const app = express();

// Basic middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret))


// Cors 
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5173","https://interviewaiafrotech.netlify.app"], // Allows clear all origins, you can restrict this to specific origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false 
}));


// Cookie Sessions 
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: [process.env.COOKIE_KEY || 'random-cookie-key']
}))


// Passport 
app.use(passport.initialize());
app.use(passport.session());


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

app.get('/sentry-test',(req, res)=>{ throw new Error("I'm disappointed withh sentry's documentation ")})
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);



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
  return res.status(200).json({ success: true, "msg":"Welcome to the Interview AI API"})
});

function access(req: Request, res: Response, next: NextFunction )
{
  res.setHeader('Access-Control-Allow-Origin', '*')
  next() 
}

app.get('/auth/google', access, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// **** Export default **** //

export { passport } 
export default app
