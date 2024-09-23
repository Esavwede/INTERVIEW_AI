




/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/job-profiles/{id}:
 *   delete:
 *     summary: Deletes User Job Profile 
 *     description: Deletes a Job Profile From a User's Job Profiles 
 *     tags:
 *       - Job Profile
 *     security:
 *       - bearerAuth: [] # Bearer Auth here
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job Profile Id 
 * 
 *     responses:
 *       '200':
 *         description: Job Profile Deleted Successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status of the operation
 *                   example: true
 *                 msg:
 *                   type: string
 *                   description: Status of the operation
 *                   example: Job Profile Deleted Successfully 
 *                   
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
 *                   example: Did not find Id in request params 
 *       '422':
 *         description: Cannot Process Request with Incompatible values 
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
 *                   example: Job Profile in Request params not valid 
 *       '404':
 *         description: User Job Profile not Found For Deletion
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
 *                   example: Did not find Job Profile to delete 
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
