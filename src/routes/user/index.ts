import { Router } from "express"
import { Express } from "express-serve-static-core" 
import logger from "../../system/logger/logger" 
import { SignupSchema} from "@src/schemas/user/signupSchema"
import { UserController } from "@src/controller/user/user"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"

const router = Router() 


export function userRoutes( app: Express )
{

    const userController = new UserController() 



   
/**
 * @openapi
 * /api/v1/signup:
 *   post:
 *     summary: User Signup Route
 *     description: User Signup Route
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User's firstname
 *                 example: firstname
 *               lastname:
 *                 type: string
 *                 description: User's lastname
 *                 example: lastname
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: EFAE#@R@#R
 *               confirmPassword:
 *                 type: string
 *                 description: User confirm password
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: user@gmail.com
 *     responses:
 *       201:
 *         description: Returns user created response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Signup Successful
 *                 status:
 *                   type: string
 *                   description: Status of operation
 *                 data:
 *                   type: object
 *                   properties:
 *                     userData:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Id of new user
 *                           example: user_id
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email exists
 *       500:
 *         description: Server error
 */



    router.post('/signup', validateRequestSchema( SignupSchema ), userController.signup.bind( userController ) )


   /**
 * @openapi
 * /api/v1/signin:
 *   post:
 *     summary: User Signin
 *     description: Signs a user into the app and returns user data and tokens
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Valid user email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 description: User password string
 *                 example: ljfaoei##@2
 *     responses:
 *       500: 
 *         description: Server Error 
 *       400:
 *         description: Bad Request Body 
 *       200:
 *         description: Successful signin returns user data and tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                       example: user_id
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Access token for authenticated user
 *                       example: eyJhbGciOiJIUzI1NiIsIn...
 *                     refreshToken:
 *                       type: string
 *                       description: Refresh token 
 *                       example: lfae9ifaej232 
 */


    router.post('/signin', userController.signin.bind( userController ) ) 

    app.use('/api/v1', router )
    logger.info("USER ROUTES CREATED")
}

