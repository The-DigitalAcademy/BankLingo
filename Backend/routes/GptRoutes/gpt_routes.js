import {
  askSimpleQuestionController,
  askQuestionHumourController,
  createLessonPlanController,
  deleteLessonPlanController,
  getPlanByUserController,
  GenerateTopicsFromPlanController,
  getTopicByIDController
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

/**
 * @openapi
 * '/api/gpt/get_user_plans/{id}':
 *  get:
 *     tags:
 *     - Lesson Plan
 *     summary: Get Lesson Plan by user ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user_id
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
gpt_router.get("/get_user_plans/:user_id", getPlanByUserController);

/**
 * @openapi
 * '/api/gpt/generateTopics':
 *  post:
 *     tags:
 *     - Topics
 *     summary: Generate Topics From Plan
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              plan_id:
 *                type: number
 *                default: 0
 *              plan_name:
 *                type: string
 *                default: string
 *              duration:
 *                type: number
 *                default: 0
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


gpt_router.post("/generateTopics", GenerateTopicsFromPlanController);

/**
 * @openapi
 * '/api/gpt/getTopicsById/{id}':
 *  get:
 *     tags:
 *     - Topics
 *     summary: Get generate Topics From plan name
 *     parameters:
 *      - name: id
 *        in: path
 *        description: plan_id
 *        required: true
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

gpt_router.get("/getTopicsById/:plan_id",getTopicByIDController )

export default gpt_router;
