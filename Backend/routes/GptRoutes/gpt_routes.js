import {
  askSimpleQuestionController,
  askQuestionHumourController,
  createLessonPlanController,
  deleteLessonPlanController
} from "../../controllers/GptControllers/gpt_controller.js";
import express from "express";
const gpt_router = express.Router();

/**
 * @openapi
 * '/api/gpt':
 *  post:
 *     tags:
 *     - GPT Route
 *     summary: Prompt the AI
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              message:
 *                type: string
 *                default: string
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
gpt_router.post("/", askSimpleQuestionController);

/**
 * @openapi
 * '/api/gpt/humour':
 *  post:
 *     tags:
 *     - GPT Route
 *     summary: Prompt the AI
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              message:
 *                type: string
 *                default: string
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
gpt_router.post("/humour", askQuestionHumourController);

/**
 * @openapi
 * '/api/gpt/create':
 *  post:
 *     tags:
 *     - Lesson Plan
 *     summary: Create Lesson plan
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              user_id:
 *                type: number
 *                default: 0
 *              plan_name:
 *                type: string
 *                default: string
 *              duration:
 *                type: number
 *                default: 0
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Not Found
 */
gpt_router.post("/create", createLessonPlanController);



/**
 * @openapi
 * '/api/gpt/delete_plan/{id}':
 *  delete:
 *     tags:
 *     - Lesson Plan
 *     summary: Delete the Lesson Plan
 *     parameters:
 *      - name: id
 *        in: path
 *        description: plan_id
 *        required: true
 *     content:
 *     responses:
 *      200:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Not Found
 */
gpt_router.delete("/delete_plan/:plan_id", deleteLessonPlanController);

export default gpt_router;
