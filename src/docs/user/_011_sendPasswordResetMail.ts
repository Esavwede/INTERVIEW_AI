/**
 * @openapi
 * /api/v1/reset-password/request:
 *   post:
 *     summary: Send Password Reset Mail
 *     description: Sends a mail to a registered user with a link to the password reset resource.
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
 *                 description: User's email address.
 *                 example: youremail@gmail.com
 *     responses:
 *       '200':
 *         description: Password reset mail sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Sent successfully.
 *                 success:
 *                   type: boolean
 *                   description: Status of the operation.
 *                   example: true
 *       '400':
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Details about the error.
 *                   example: Bad request.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Email field is empty.
 *       '422':
 *         description: Unprocessable entity due to invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Details about the error.
 *                   example: Invalid request body items.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Invalid email format.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Details about the error.
 *                   example: Server error.
 */
