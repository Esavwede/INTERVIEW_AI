


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/markLearningModulePartAsComplete:
 *   patch:
 *     summary: Marks a learning module part as complete 
 *     description: Marks a specific part of a learning module as complete 
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: [] # Bearer Auth here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - partTitle
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ModuleId
 *                 example: aejsfaeiofae8h82938e2h32h
 *               partTitle:
 *                 type: string
 *                 description: Part title
 *                 example: Understanding resumes 
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Successfully marked learning module part as completed 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Successfully marked user module part as completed 
 *                 success:
 *                   type: boolean
 *                   description: Status of operation
 *                   example: true
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If operation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error that occurred with the request 
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: '_id required'
 *       '401':
 *         description: User not authenticated 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error message 
 *                   example: Account with this email exists
 *       '404':
 *         description: Could not find module part 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If operation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error message 
 *                   example: Did not find module part with title Understanding resumes on user learning profile 
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If operation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Server Error
 */
