/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/modules/{moduleId}/parts/{partNumber}:
 *   get:
 *     summary: Gets a part from a Module
 *     description: Gets the next or previous part from a module
 *     tags:
 *       - Learning Module
 *     security:
 *       - bearerAuth: [] #bearer auth 
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the learning module
 *       - in: path
 *         name: partNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The part number of the learning module
 *       - in: query
 *         name: totalParts
 *         required: true
 *         schema:
 *           type: integer
 *         description: The total number of parts in the learning module
 *     responses:
 *       '200':
 *         description: Part retrieved successfully
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
 *                     part:
 *                       type: object
 *                       properties:
 *                         learningModuleId:
 *                           type: string
 *                           example: "66e61f3aa6f33d9d932a26d3"
 *                         quizId:
 *                           type: string
 *                           example: "hddhdtrd656d6dd56d"
 *                         content:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: "Part 12"
 *                               value:
 *                                 type: string
 *                                 example: "Img Link"
 *                               _id:
 *                                 type: string
 *                                 example: "66e6388ce2f7ec04a051108e"
 *                         isLast:
 *                           type: boolean
 *                           example: false
 *                         _id:
 *                           type: string
 *                           example: "66e6388ce2f7ec04a051108d"
 *       '401':
 *         description: User not signed in 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was unauthorized
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: User not signed In 
 *                   example: User not signed In 
 *       '404':
 *         description: Part Not Found 
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
 *                   example: "Part not found"
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
