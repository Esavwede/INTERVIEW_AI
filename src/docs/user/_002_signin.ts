/**
 * @openapi
 * /api/v1/signin:
 *   post:
 *     summary: User Signin
 *     description: If user is new, it returns onboarding screen data; otherwise, it returns user dashboard data.
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
 *                 example: youremail@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password
 *     responses:
 *       '200':
 *         description: Successful signin returns user data and tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the signin was successful
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
 *                     learningModules:
 *                       type: object
 *                       properties:
 *                         stage1Id:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               stage:
 *                                 type: string
 *                                 description: The stage identifier
 *                                 example: 66e5eb3350d321c2cb17d98f
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning module
 *                                 example: Test
 *                               area:
 *                                 type: string
 *                                 description: Area or category of the module
 *                                 example: area1
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the module
 *                                 example: 3
 *                               _id:
 *                                 type: string
 *                                 description: Module identifier
 *                                 example: 66e5ec768f20443946e1ccfb
 *                               imgSrc:
 *                                 type: string
 *                                 description: Learning Module Image URL
 *                                 example: https://pictureurl.com/82932893rh9f2
 *                               description:
 *                                 type: string
 *                                 description: Learning Module description
 *                                 example: Learn about a and b
 *                         stage2Id:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               stage:
 *                                 type: string
 *                                 description: The stage identifier
 *                                 example: 66e5eb3350d321c2cb17d98f
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning module
 *                                 example: Test
 *                               area:
 *                                 type: string
 *                                 description: Area or category of the module
 *                                 example: area1
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the module
 *                                 example: 3
 *                               _id:
 *                                 type: string
 *                                 description: Module identifier
 *                                 example: 66e5ec768f20443946e1ccfb
 *                               imgSrc:
 *                                 type: string
 *                                 description: Learning Module Image URL
 *                                 example: https://pictureurl.com/82932893rh9f2
 *                               description:
 *                                 type: string
 *                                 description: Learning Module description
 *                                 example: Learn about a and b
 *                         stage3Id:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               stage:
 *                                 type: string
 *                                 description: The stage identifier
 *                                 example: 66e5eb3350d321c2cb17d98f
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning module
 *                                 example: Test
 *                               area:
 *                                 type: string
 *                                 description: Area or category of the module
 *                                 example: area1
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the module
 *                                 example: 3
 *                               _id:
 *                                 type: string
 *                                 description: Module identifier
 *                                 example: 66e5ec768f20443946e1ccfb
 *                               imgSrc:
 *                                 type: string
 *                                 description: Learning Module Image URL
 *                                 example: https://pictureurl.com/82932893rh9f2
 *                               description:
 *                                 type: string
 *                                 description: Learning Module description
 *                                 example: Learn about a and b
 *                         stage4Id:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               stage:
 *                                 type: string
 *                                 description: The stage identifier
 *                                 example: 66e5eb3350d321c2cb17d98f
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning module
 *                                 example: Test
 *                               area:
 *                                 type: string
 *                                 description: Area or category of the module
 *                                 example: area1
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the module
 *                                 example: 3
 *                               _id:
 *                                 type: string
 *                                 description: Module identifier
 *                                 example: 66e5ec768f20443946e1ccfb
 *                               imgSrc:
 *                                 type: string
 *                                 description: Learning Module Image URL
 *                                 example: https://pictureurl.com/82932893rh9f2
 *                               description:
 *                                 type: string
 *                                 description: Learning Module description
 *                                 example: Learn about a and b
 *                         stage5Id:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               stage:
 *                                 type: string
 *                                 description: The stage identifier
 *                                 example: 66e5eb3350d321c2cb17d98f
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning module
 *                                 example: Test
 *                               area:
 *                                 type: string
 *                                 description: Area or category of the module
 *                                 example: area1
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the module
 *                                 example: 3
 *                               _id:
 *                                 type: string
 *                                 description: Module identifier
 *                                 example: 66e5ec768f20443946e1ccfb
 *                               imgSrc:
 *                                 type: string
 *                                 description: Learning Module Image URL
 *                                 example: https://pictureurl.com/82932893rh9f2
 *                               description:
 *                                 type: string
 *                                 description: Learning Module description
 *                                 example: Learn about a and b
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the operation
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Input Email'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that authentication failed
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 *                   example: Unauthorized Access
 *       '403':
 *         description: User Not Verified to access dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User Not Verified to access dashboard
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that the requested resource was not found
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Detailed error message
 *                   example: 'Resource not found'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Description of the server error
 *                   example: Internal Server Error
 */
