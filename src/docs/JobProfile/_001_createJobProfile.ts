

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/v1/job-profiles:
 *   post:
 *     summary: Create Job Profile
 *     description: Creates a Job Profile For a User by taking user's jobRole, experienceLevel, and Resume
 *     tags:
 *       - Job Profile
 *     security:
 *       - bearerAuth: [] # Bearer Auth here
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jobRole:
 *                 type: string
 *                 description: The job role you are applying for
 *                 example: Backend Developer
 *               experienceLevel:
 *                 type: string
 *                 description: Your level of experience (e.g., Junior, Mid, Senior)
 *                 example: Junior
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Your resume in PDF format
 *             required:
 *               - jobRole
 *               - experienceLevel
 *               - resume
 *     responses:
 *       '201':
 *         description: New Job Profile Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Job Profile Created Successfully
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
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Status of the operation
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Error message indicating unauthorized access
 *                   example: Unauthorized access, please log in
 *       '422':
 *         description: Invalid Request Body Items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If Job Profile Creation was successful
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Info about operation
 *                   example: Invalid Request Body Items
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'Request body Invalid'
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
