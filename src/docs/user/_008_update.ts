

/**
 * @openapi
 * /api/v1/users/update:
 *   patch:
 *     summary: Updates A User 
 *     description: Updates specific fields on the user like firstname, lastname, email.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User's firstname
 *                 example: firstname
 *               lastname:
 *                 type: string
 *                 description: User's lastname
 *                 example: lastname
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: youremail@gmail.com
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: User Update Successful 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User Update Successful
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
 *                   description: If signup was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error that occurred with the request 
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Firstname field empty'
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
 *       '500':
 *         description: Server error
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
 *                   description: Info about operation
 *                   example: Server Error
 */
