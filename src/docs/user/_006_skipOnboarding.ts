
/**
 * @openapi
 * openapi: 3.0.0
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * info:
 *   title: API Documentation
 *   version: 1.0.0
 * paths:
 *   /api/v1/onboarding/skip:
 *     patch:
 *       summary: Skip Onboarding
 *       description: Skips onboarding
 *       tags:
 *         - User
 *       security:
 *         - bearerAuth: []  # Security requirement for this endpoint
 *       responses:
 *         '200':
 *           description: User Onboarding Skipped Successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                     example: Onboarding Skipped
 *                   success:
 *                     type: boolean
 *                     description: Status of operation
 *                     example: true
 *         '404':
 *           description: User Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If unsuccessful
 *                     example: false
 *                   msg:
 *                     type: string
 *                     description: Info about operation
 *                     example: Could Not Find User
 *         '401':
 *           description: Unauthorized - user not authenticated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indicates the failure of authentication
 *                     example: false
 *                   msg:
 *                     type: string
 *                     description: Information about the authentication failure
 *                     example: User not authenticated
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If there was a server error
 *                     example: false
 *                   msg:
 *                     type: string
 *                     description: Info about operation
 *                     example: Server Error
 *
 */
