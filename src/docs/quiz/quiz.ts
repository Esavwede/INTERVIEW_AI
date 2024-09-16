


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/quizzes/{quizId}:
 *   get:
 *     summary: Gets a Quiz
 *     description: Returns a quiz for a particular lesson/part
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []  # bearer auth
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the quiz to be returned from the database
 *     responses:
 *       200:
 *         description: Found Quiz 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66e5745f8066ad64d67d7b5d"
 *                     title:
 *                       type: string
 *                       example: "Resume Basics"
 *                     description:
 *                       type: string
 *                       example: "select the right answers"
 *                     moduleId:
 *                       type: string
 *                       example: "66d769fbeaa4ff11247644b6"
 *                     modulePartNumber:
 *                       type: integer
 *                       example: 1
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66e817f40d0559a43741f35d"
 *                           text:
 *                             type: string
 *                             example: "what is an interview"
 *                           options:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 char:
 *                                   type: string
 *                                   example: "a"
 *                                 value:
 *                                   type: string
 *                                   example: "option a"
 *                                 _id:
 *                                   type: string
 *                                   example: "66e817f40d0559a43741f35e"
 *                             example:
 *                               - char: "a"
 *                                 value: "option a"
 *                                 _id: "66e817f40d0559a43741f35e"
 *                               - char: "b"
 *                                 value: "option a"
 *                                 _id: "66e817f40d0559a43741f35f"
 *                               - char: "c"
 *                                 value: "option a"
 *                                 _id: "66e817f40d0559a43741f360"
 *                               - char: "d"
 *                                 value: "option a"
 *                                 _id: "66e817f40d0559a43741f361"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-14T11:32:47.981Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-14T11:32:47.981Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
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
 *                   description: User not signed in
 *                   example: User not signed in
 *       '404':
 *         description: Quiz Not Found
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
 *                   description: Information on failure 
 *                   example: "Quiz not found"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if a server error occured 
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Information about the server error
 *                   example: "Server error"
 */
