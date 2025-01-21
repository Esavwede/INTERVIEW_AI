
import passport from "passport";
import GoogleSigninStrategy from "../googleAuth/signinWithGoogle";
import LinkedinSigninStrategy from "../linkedinAuth/signinWithLinkedin";

passport.use( GoogleSigninStrategy ) 
passport.use( LinkedinSigninStrategy )

export default passport 