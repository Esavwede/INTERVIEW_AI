

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
import passport from "./middleware/passportAuth/passport" 


import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';
import { NodeEnvs } from '@src/common/misc';
import { routes } from './routes';



const app = express();

var redisClient: any 
var SetCache: any 

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


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});



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

// The error handler must be registered before any other error middleware and after all controllers
// Sentry.setupExpressErrorHandler(app);

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


app.get('/auth/linkedin', (req: Request, res: Response)=>{ 

  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=${process.env.LINKEDIN_AUTH_CSRF_STRING}&scope=profile%20email%20openid`
  res.redirect(url)

})

app.get('/api/v1/auth/linkedin/callback', async(req: Request, res: Response)=>{ 


        // Validate state string 
        var { state, code } = req.query

        if( !state ) return res.status(400).json({ success: false, msg:"unauthorized"})
        if( !code ) return res.status(400).json({ success: false, msg:"unauthorized"})

        // Protect Against CSRF
        if( state !== process.env.LINKEDIN_AUTH_CSRF_STRING ) return res.status(400).json({ success: false, msg:"unauthorized"})


        /** Get Access Token */
        const url = 'https://www.linkedin.com/oauth/v2/accessToken'

        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code as string, 
          client_id: process.env.LINKEDIN_CLIENT_ID as string,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET as string, 
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI as string // Replace with your redirect URI
        });
  

    try 
    {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      
      if (!response.ok) {
        throw new Error(`Error fetching access token: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Access Token Response:', data);

      // Get User Data 
      return res.json( data )
    }
    catch(err: any)
    {
        console.log("Error while signing user in with linkedin")
        console.log(err)
        return res.status(500).json({ success: false, msg:"server error"})
    }
})



// **** Export default **** //
export { passport, redisClient, SetCache } 
export default app
