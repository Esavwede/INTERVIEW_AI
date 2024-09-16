
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from '@src/models/User';
import logger from '@src/system/logger/logger';
import { ServerError } from '@src/util/Errors/Endpoints/serverError';
import { UserRepository } from '@src/repos/user/user.repo';

import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';


          // Define the types for the profile object from Google
              interface GoogleProfile
                        {
                          
                          id: string;
                          displayName: string;
                          name: 
                              {
                                    familyName: string;
                                    givenName: string;
                              };
                          emails: 
                                  Array<{
                                          value: string;
                                          verified: boolean;
                                      }>;
                          photos: 
                                  Array<{
                                          value: string;
                                        }>;
                        }

        const userRepo = new UserRepository() 

        const authCredentials =   {
                                      clientID: process.env.GOOGLE_AUTH_CLIENT_ID as string,
                                      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
                                      callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL as string,
                                  }                       



        async function authCallBack( accessToken: string, refreshToken: string, profile: GoogleProfile,done: VerifyCallback) {
          try {

                    var email = profile.emails[0].value as unknown as string  // User Email 
                    const user = await userRepo.findByEmail( email ) // Find User In Db 

                    if( !user?._id )
                    {

                      logger.info("SIGNIN_WITH_GOOGLE: New User Login") 
                   
                      // Save New User to Database 
                      const firstName = profile.name.givenName;
                      const lastName = profile.name.familyName;
                      const email = profile.emails[0]?.value
                      const newUserDoc = { firstname: firstName, lastname: lastName, email }

                      const newUser = await User.create( newUserDoc )

                      return done(null, newUser ) 
                    }

                      logger.info("SIGNIN_WITH_GOOGLE: Existing User Login")
                      return done(null, user )
                  
            } catch (e: any) {
                  logger.error(e,`SIGNIN WITH GOOGLE ERROR: Could Not Signin User`) 
                  throw new ServerError("Error Occured while signing in User with google")
            }
        }


passport.use(new GoogleStrategy(authCredentials, authCallBack));

export default passport;
