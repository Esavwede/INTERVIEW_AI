

/**
 * @openapi
 * /api/v1/user/verify:
 *   get:
 *     summary: Verify User Email 
 *     description: Verifies A User 
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User Email Successfully Verified 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User Email Verified 
 *                 success:
 *                   type: boolean
 *                   description: Status of operation
 * 
 *       400:
 *         description: Bad Request Did not Find token In Url 
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
 *                   example: Did not find Verification token in Url 
 *                 errors:
 *                   type: array 
 *                   items:
 *                     type: string 
 *                     example: 'Verification Token Not Found In Url'                 
 *      
 * 
 *       500:
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
