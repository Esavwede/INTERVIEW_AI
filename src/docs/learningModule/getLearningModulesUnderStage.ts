


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/modules/:
 *   get:
 *     summary: Get Learning Modules Under a Stage
 *     description: Gets a specified range of learning modules from each Stage in the Job Search Life Cycle.
 *     tags:
 *       - Learning Module
 *     security:
 *       - bearerAuth: [] # Bearer Auth here
 *     parameters:
 *       - in: query
 *         name: stageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the stage to retrieve learning modules for.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         required: true 
 *         description: The page number for pagination (defaults to 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         required: true
 *         description: Number of results per page (defaults to 10).
 *     responses:
 *       '200':
 *         description: Successful response with learning modules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status of the operation
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     learningModules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66e6ddb57d8b6a9cd4036020"
 *                           title:
 *                             type: string
 *                             example: "Interview 101"
 *                           area:
 *                             type: string
 *                             example: "66e6dc2c4d1c6a071d0743b6"
 *                           stage:
 *                             type: string
 *                             example: "66e6dc7d952996b0b22fabe1"
 *                           description:
 *                             type: string
 *                             example: "An introduction to how interviews work"
 *                           imgSrc:
 *                             type: string
 *                             example: "https://coverletterpedia.com/wp-content/uploads/2022/07/Part-Time-Job-Resume-Sample_0001.jpg"
 *                           totalParts:
 *                             type: integer
 *                             example: 4
 *       '401':
 *         description: Unauthorized - user not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of authentication.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the authentication failure.
 *                   example: User not authenticated
 *       '400':
 *         description: Bad Request Query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the failure.
 *                   example: error with the request query
 *       '500':
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if there was a server error.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the server error.
 *                   example: Server error
 */
