import { Router } from "express"
import { Express } from "express-serve-static-core" 
import   logger from "../../system/logger/logger" 
import { SaveUserFirstAndLastNameValidationSchema, SignupSchema, VerifyUserValidationSchema} from "@src/schemas/user/signupSchema"
import { UserController } from "@src/controller/user/user"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { OnboardingValidationSchema } from "@src/schemas/onboarding/onboarding.schema"
import { validateRequestToken } from "@src/util/Auth/tokens"
import { passport } from "@src/server"
import { SaveLearningModuleSummaryValidationSchema } from "@src/schemas/learningModule/learningModule.schema"

const router = Router() 

export function userRoutes( app: Express )
{

    const userController = new UserController() 

    router.post('/signup', validateRequestSchema( SignupSchema ), userController.signup.bind( userController ) )

    router.post('/signin', userController.signin.bind( userController ) ) 

    router.patch('/users/update', validateRequestToken, validateRequestSchema( SaveUserFirstAndLastNameValidationSchema ), userController.update.bind( userController ) )
      
    router.get('/users/verify', validateRequestSchema( VerifyUserValidationSchema ) ,userController.verifyUser.bind( userController ) ) 

    router.patch('/onboarding/skip' , validateRequestToken, userController.skipOnboarding.bind( userController ) )     

    router.patch('/onboarding' , validateRequestToken, validateRequestSchema( OnboardingValidationSchema ),userController.addLearningModulesToUserProfile.bind( userController ) ) 
    
    router.post('/users/learning-modules', validateRequestToken, validateRequestSchema( SaveLearningModuleSummaryValidationSchema ),userController.addLearningModulesToUserProfile.bind( userController ) )
  
    app.get('/auth/google/callback', passport.authenticate('google', { session: false }), userController.signinWithGoogle.bind( userController ) )

    router.patch('/learning-profile', validateRequestSchema( OnboardingValidationSchema ), userController.addLearningModulesToUserProfile.bind( userController))

    app.use('/api/v1', router )
    logger.info("User Routes Created")
}

