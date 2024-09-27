

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
 *         description: Successful response with user data and tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         newUser:
 *                           type: boolean
 *                           description: Indicates if the user is new.
 *                           example: false
 *                         userId:
 *                           type: string
 *                           description: Unique identifier for the user.
 *                           example: 66edd4673a44e06b864fbb53
 *                         learningProfile:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Unique identifier for the learning profile.
 *                                 example: 66f6abb64f40b38f69a13602
 *                               area:
 *                                 type: string
 *                                 description: Unique identifier for the learning area.
 *                                 example: 66f12626638df8f7223e5656
 *                               stage:
 *                                 type: string
 *                                 description: Unique identifier for the stage.
 *                                 example: 66e73d98e955a7a3d49dfa92
 *                               stageName:
 *                                 type: string
 *                                 description: Name of the current stage.
 *                                 example: core
 *                               stageNumber:
 *                                 type: integer
 *                                 description: Numeric representation of the stage.
 *                                 example: 1
 *                               title:
 *                                 type: string
 *                                 description: Title of the learning profile.
 *                                 example: Dressing The Part
 *                               description:
 *                                 type: string
 *                                 description: Brief description of the learning profile.
 *                                 example: Get the core understanding of a resume
 *                               imgSrc:
 *                                 type: string
 *                                 description: Image source URL.
 *                                 example: https://coverletterpedia.com/wp-content/uploads/2022/07/Part-Time-Job-Resume-Sample_0001.jpg
 *                               totalParts:
 *                                 type: integer
 *                                 description: Total number of parts in the profile.
 *                                 example: 6
 *                               partsMetaData:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                       description: Unique identifier for the part.
 *                                       example: 66f6abec4f40b38f69a13604
 *                                     title:
 *                                       type: string
 *                                       description: Title of the part.
 *                                       example: Introduction to dressing
 *                                     hasBeenCompleted:
 *                                       type: boolean
 *                                       description: Indicates if the part has been completed.
 *                                       example: true
 *                               currentPart:
 *                                 type: integer
 *                                 description: Current part the user is on.
 *                                 example: 1
 *                               nextPart:
 *                                 type: integer
 *                                 description: Next part the user is expected to start.
 *                                 example: 1
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           description: JWT access token for user authentication.
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVkZDQ2NzNhNDRlMDZiODY0ZmJiNTMiLCJ1c2VySGFzQ3JlYXRlZEZpcnN0Sm9iUHJvZmlsZSI6dHJ1ZSwiaWF0IjoxNzI3NDU0NzkyLCJleHAiOjE3Mjc1Mzc1OTJ9.2ilLPyzyU9vuhFT_lcEZogfLgH9MkQ_qPA2EBb5-sVo
 *                         refreshToken:
 *                           type: string
 *                           description: JWT refresh token for obtaining new access tokens.
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVkZDQ2NzNhNDRlMDZiODY0ZmJiNTMiLCJ1c2VySGFzQ3JlYXRlZEZpcnN0Sm9iUHJvZmlsZSI6dHJ1ZSwiaWF0IjoxNzI3NDU0NzkyLCJleHAiOjE3Mjc1Mzc1OTJ9.2ilLPyzyU9vuhFT_lcEZogfLgH9MkQ_qPA2EBb5-sVo
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
