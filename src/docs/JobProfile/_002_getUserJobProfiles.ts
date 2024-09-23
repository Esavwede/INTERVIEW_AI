




/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/job-profiles/:
 *   get:
 *     summary: Gets a user's Job Profiles 
 *     description: Gets a user's Job Profiles. If a user has no prior job profile, it returns 404, if it's empty returns 200
 *     tags:
 *       - Job Profile
 *     security:
 *       - bearerAuth: [] # Bearer Auth here
 *   
 *     responses:
 *       '200':
 *         description: Job profiles retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userJobProfiles:
 *                       type: array
 *                       description: List of user job profiles.
 *                       items:
 *                         type: object
 *                         properties:
 *                           jobRole:
 *                             type: string
 *                             description: The job role of the profile.
 *                             example: Job Role
 *                           experienceLevel:
 *                             type: string
 *                             description: The experience level of the job profile.
 *                             example: junior
 *                           resumeUrl:
 *                             type: string
 *                             description: URL of the resume.
 *                             example: Resume URL
 *                           _id:
 *                             type: string
 *                             description: Unique identifier of the job profile.
 *                             example: 66f0121414d16a84c63d3a05
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
 *       '404':
 *         description: User does not have a Job Profile. Create New Job Profile 
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
 *                   example: No Job Profile Found For User, create new Job profile 
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


