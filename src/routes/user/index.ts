

import { Router } from "express"
import { Express } from "express-serve-static-core" 
import   logger from "../../system/logger/logger" 
import { markLearningModulePartAsCompletedValidationSchema, SaveUserFirstAndLastNameValidationSchema, SignupSchema, VerifyUserValidationSchema} from "@src/schemas/user/signupSchema"
import { UserController } from "@src/controller/user/user"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { OnboardingValidationSchema } from "@src/schemas/onboarding/onboarding.schema"
import { validateRequestToken } from "@src/util/Auth/tokens"
import { passport } from "@src/server"
import { SaveLearningModuleSummaryValidationSchema } from "@src/schemas/learningModule/learningModule.schema"
import { ResendSignupMailValidationSchema } from "@src/schemas/mail/mail.schema"
import { GetPasswordResetEmailValidationSchema, ResetPasswordValidationSchema } from "@src/schemas/reset/password/resetPassword.schema"

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
  
    router.get('/auth/google/callback', passport.authenticate('google', { session: false }), userController.signinWithGoogle.bind( userController ) )

    router.get('/api/v1/auth/linkedin/signin', userController.signinWithLinkedin.bind( userController ))

    router.patch('/learning-profile', validateRequestSchema( OnboardingValidationSchema ), userController.addLearningModulesToUserProfile.bind( userController))

    router.post('/signup/resend-mail', validateRequestSchema( ResendSignupMailValidationSchema), userController.reSendSignupMail.bind( userController ) )

    router.patch(
        '/markLearningModulePartAsComplete',
        validateRequestToken,
        validateRequestSchema( markLearningModulePartAsCompletedValidationSchema ),
        userController.markUserLearningPartAsComplete.bind( userController ) 
    )

    router.post('/token',
        userController.getNewAccessToken.bind( userController )  
    )


    router.post(
        '/reset-password/request',
        validateRequestSchema( GetPasswordResetEmailValidationSchema),
        userController.sendResetPasswordEmail.bind( userController )
    )

    router.post(
        '/reset-password',
        validateRequestSchema( ResetPasswordValidationSchema ),
        userController.resetPassword.bind( userController )
    )




    app.use('/api/v1', router )
    logger.info("User Routes Created")

}

