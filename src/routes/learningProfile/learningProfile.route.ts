




import {  Express } from "express-serve-static-core"
import { Router } from "express"
import logger from "@src/system/logger/logger"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { LearningProfileController } from "@src/controller/learningProfile/learningProfile"
import { CreateLearningProfileValidationSchema } from "@src/schemas/learningProfile/learningProfile.schema"


const router = Router() 

export function learningProfileRoutes(app: Express )
{
    try 
    {

        const learningProfileController = new LearningProfileController() 


/**
 * @swagger
 * /api/v1/learning/profile/:
 *   post:
 *     summary: Create a Learning Profile
 *     description: Creates a new learning profile with optional learning modules.
 *     tags:
 *       - Onboarding
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - learningModules.moduleId
 *               - learningModules.stage
 *               - learningModules.title
 *               - learningModules.description
 *             properties:
 *               userId:
 *                 type: string
 *                 description: "User ID for the learning profile."
 *                 example: "66dfe96127616c75304ba094"
 *               learningModules:
 *                 type: array
 *                 description: "An optional array of learning modules."
 *                 items:
 *                   type: object
 *                   properties:
 *                     moduleId:
 *                       type: string
 *                       description: "Learning module ID."
 *                       example: "66df594cf6590cb38d5f8c07"
 *                     stage:
 *                       type: string
 *                       description: "Learning module stage ID."
 *                       example: "beginner"
 *                     title:
 *                       type: string
 *                       description: "Title of the learning module."
 *                       example: "Introduction to JavaScript"
 *                     description:
 *                       type: string
 *                       description: "Description of the learning module."
 *                       example: "This module covers the basics of JavaScript."
 *     responses:
 *       409:
 *         description: "USER LEARNING PROFILE ALREADY EXISTS "
 *       201:
 *         description: "Learning profile created successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Learning profile created."
 *                 data:
 *                   type: object
 *                   description: "The created learning profile data."
 *       400:
 *         description: "Bad request, invalid or missing input."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid request body."
 *       500:
 *         description: "Internal server error."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the learning profile."
 */

    
        // Create Learning Profile 
        router.post('/', validateRequestSchema( CreateLearningProfileValidationSchema ), learningProfileController.create.bind( learningProfileController ) )

        app.use('/api/v1/learning/profile', router )

        logger.info("Learning Profile Routes Built")

    }
    catch(e: any)
    {
        logger.error(e,"Learning Profile ROUTE ERROR") 
    }
}