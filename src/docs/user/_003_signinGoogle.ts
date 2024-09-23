

/**
 * @openapi
 * /auth/google:
 *   get:
 *     summary: Sign in with Google
 *     description: Signs in a user with Google
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Successful sign-in returns user data and tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the sign-in was successful
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         newUser:
 *                           type: boolean
 *                           description: Indicates if the user is new
 *                           example: true
 *                         firstname:
 *                           type: string
 *                           description: User's first name
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           description: User's last name
 *                           example: lastname
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           description: Access token for authenticated user
 *                           example: eyJhbGciOiJIUzI1NiIsIn...
 *                         refreshToken:
 *                           type: string
 *                           description: Refresh token
 *                           example: lfae9ifaej232
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If sign-in was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the operation
 *                   example: Server Error
 */
