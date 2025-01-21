

// System 
import { config } from "dotenv"
config() 
import logger from '@src/system/logger/logger';

// Auth
import { Strategy as LinkedInStrategy, Profile } from "passport-linkedin-oauth2"

// Repository 
import { UserRepository } from '@src/repos/user/user.repo';
import { ServerError } from '@src/util/Errors/Endpoints/serverError';
import { User } from '@src/models/User';



// LinkedIn App Credentials
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || ''
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '' 


// New User Repository
const UserRepo = new UserRepository() 

const authCredentials = 
                        {
                                clientID: LINKEDIN_CLIENT_ID,
                                clientSecret: LINKEDIN_CLIENT_SECRET,
                                callbackURL: 'http://localhost:3000/api/v1/auth/linkedin/callback',
                                scope: ['email'],
                                state: true 
                        }


const LinkedinSigninStrategy = new LinkedInStrategy(authCredentials, authCallback)

async function authCallback( accessToken: string, refreshToken: string, profile: any, done: any ){
    
  console.log("----DEBUG%----")
  console.log( profile ) 


    const { id, displayName, emails } = profile;
    try {

      var email = emails[0].value as unknown as string  // User Email 
      const user = await UserRepo.findByEmail( email ) // Find User In Db 

      if( !user?._id )
      {

        logger.info("SIGNIN_WITH_: New User Login") 
     
        // Save New User to Database 

        let firstName = '';
        let lastName = '';
  
        if (displayName) {
          const nameParts = displayName.split(' ');
          firstName = nameParts[0] || '';
          lastName = nameParts.slice(1).join(' ') || ''; // Join remaining parts for last name
        }


        const email =  emails?.[0]?.value as unknown as string 
        const newUserDoc = { firstname: firstName, lastname: lastName, email }

        const newUser = await User.create( newUserDoc )

        return done(null, newUser ) 
      }

        logger.info("SIGNIN_WITH_LINKEDIN: Existing User Login")
        return done(null, user )
    
} catch (e: any) {
    logger.error(e,`SIGNIN WITH LINKEDIN ERROR: Could Not Signin User`) 
    throw new ServerError("Error Occured while signing in User with LINKEDIN")
}
  }

export default LinkedinSigninStrategy 