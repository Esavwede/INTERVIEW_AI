/**
 * @openapi
 * /api/v1/signup/resend-mail:
 *   post:
 *     summary: Resend Signup Mail 
 *     description: Resends a signup mail to the provided email 
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
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: youremail@gmail.com
 *     responses:
 *       '200':
 *         description: Signup Mail Successfully Resent 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Resend Successful
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
 *                   description: Info about operation
 *                   example: Bad Request
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Email field empty'
 *       '422':
 *         description: Invalid Request Body Items
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
 *                   example: Invalid Request Body Items
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Invalid email format'
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