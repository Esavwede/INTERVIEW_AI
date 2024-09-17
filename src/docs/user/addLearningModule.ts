

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/users/learning-modules:
 *   post:
 *     summary: Adds Learning Module(s) to a Users Learning Profile 
 *     description: Saves one or more learning Modules to a users learning Profile 
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: [] #Bearer Auth Here 
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - overviews
 *             properties:
 *               learningModules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - moduleId
 *                     - stage
 *                     - area
 *                     - totalParts
 *                     - title
 *                     - description
 *                     - imgSrc
 *                   properties:
 *                     moduleId:
 *                       type: string
 *                       description: The unique identifier of the module
 *                       example: "66e435b00c582c06d8d9c85f"
 *                     stage:
 *                       type: string
 *                       description: The unique identifier of the stage
 *                       example: "66e4306ddf630e7925f92bb4"
 *                     area:
 *                       type: string
 *                       description: The unique identifier of the area
 *                       example: "66e4300d61f75b8017be6eb8"
 *                     totalParts:
 *                       type: integer
 *                       description: The total number of parts in the module
 *                       example: 5
 *                     title:
 *                       type: string
 *                       description: The title of the module
 *                       example: "Writing World Class Resumes"
 *                     description:
 *                       type: string
 *                       description: A brief description of the module
 *                       example: "description"
 *                     imgSrc:
 *                       type: string
 *                       format: uri
 *                       description: The URL of the image associated with the module
 *                       example: "https://example.com/image.png"
 *     responses:
 *       '200':
 *         description: Successfully Added Learning Module(s) to User Learning Profile 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Success Message 
 *                 success:
 *                   type: boolean
 *                   description: Status of the operation
 *                   example: true
 *       '401':
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of authentication
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the authentication failure
 *                   example: User not authenticated
 *       '404':
 *         description: User learning profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the failure
 *                   example: Did not find user to onboard 
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if there was a server error
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the server error
 *                   example: "Server error"
 */
