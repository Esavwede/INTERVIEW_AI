

import { Router, Express } from "express"
import logger from "@src/system/logger/logger"
import { LearningModuleController } from "@src/controller/learningModule/learningModule.controller"
import { validateRequestSchema } from "@src/middleware/validate/request/validateRequestSchema"
import { CreateLearningModuleSchema, DeleteLearningModuleSchema, GetLearningModuleSchema, PublishLearningModuleValidationSchema, UpdateLearningModuleSchema } from "@src/schemas/learningModule/learningModule.schema"
import { LearningModulePartController } from "@src/controller/learningModulePart/learningModulePart.controller"
import { GetLearningModulePartValidationSchema } from "@src/schemas/learningModule/learningModule.schema"
import { validateRequestToken } from "@src/util/Auth/tokens"


const router = Router() 

export function learningModuleRoutes(app: Express )
{
    try 
    {

        const learningModuleController = new LearningModuleController() 
        const learningModulePartController = new LearningModulePartController() 



        /*@openapi */
/**
 * @openapi
 * /learning-module:
 *   post:
 *     tags:
 *       - Learning Module
 *     summary: Create a new learning module
 *     description: This endpoint allows users to create a new learning module by providing the necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Title of the learning module"
 *                 example: "Interview preparations"
 *               area:
 *                 type: string
 *                 description: "Id of Area"
 *                 example: "7478723y22rh33ih"
 *               stage:
 *                 type: string
 *                 description: "Stage Id"
 *                 example: "jfaoj3232r32r"
 *               description:
 *                 type: string
 *                 description: "Detailed description of the module"
 *                 example: "How to Prepare for Interviews"
 *               imgSrc:
 *                 type: string
 *                 format: url
 *                 description: "Image URL for the module"
 *                 example: "https://example.com/image.png"
 *     responses:
 *       '201':
 *         description: Learning module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: boolean
 *                 message:
 *                   type: string
 *                   example: "Learning module created successfully"
 *       '400':
 *         description: Bad request. Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed. Please input valid data."
 *       '401':
 *         description: Unauthorized. Access token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       '403':
 *         description: Forbidden. User doesn't have permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to perform this action."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred on the server."
 */

        // Create Learning Module 
        router.post('/', validateRequestSchema( CreateLearningModuleSchema), learningModuleController.create.bind( learningModuleController ))
        











/*@openapi */
/**
 * @openapi
 * /learning-module/{id}:
 *   get:
 *     tags:
 *       - Learning Module
 *     summary: Get a specific learning module by ID
 *     description: This endpoint retrieves a learning module by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the learning module"
 *         example: "60d5ec49f779c82f95dbfc9f"
 *     responses:
 *       '200':
 *         description: Learning module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d5ec49f779c82f95dbfc9f"
 *                 title:
 *                   type: string
 *                   example: "Introduction to Backend Development"
 *                 area:
 *                   type: string
 *                   example: "Backend Development"
 *                 stage:
 *                   type: string
 *                   example: "Beginner"
 *                 description:
 *                   type: string
 *                   example: "This module introduces the basic concepts of backend development."
 *                 imgSrc:
 *                   type: string
 *                   format: url
 *                   example: "https://example.com/image.png"
 *       '400':
 *         description: Bad request. Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please Input Learning Module Id"
 *       '404':
 *         description: Learning module not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Learning module not found."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred on the server."
 */

        // Get Learning Module 
        router.get('/:id', validateRequestSchema( GetLearningModuleSchema ), learningModuleController.get.bind( learningModuleController ) )

        // Update Learning Module 
        router.patch('/:id', validateRequestSchema( UpdateLearningModuleSchema ), learningModuleController.update.bind( learningModuleController ) )


        // Delete Learning Module 
        router.delete('/:id', validateRequestSchema( DeleteLearningModuleSchema), learningModuleController.delete.bind( learningModuleController ) )

        // Get Learning Module Part 
        router.get('/:moduleId/parts/:partNumber', validateRequestToken ,validateRequestSchema( GetLearningModulePartValidationSchema ), learningModuleController.getPart.bind( learningModuleController))

        // Publish Learning Module 
        router.patch('/:id/publish', validateRequestSchema( PublishLearningModuleValidationSchema ), learningModuleController.publish.bind( learningModuleController))
    
        app.use('/api/v1/modules', router )

        logger.info("Learning Module Routes Built")
    }
    catch(e: any)
    {
        logger.error(e,"LEARNING MODULE ROUTES ERROR") 
    }
}