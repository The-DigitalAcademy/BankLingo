import { askSimpleQuestionController, askQuestionHumourController } from "../../controllers/GptControllers/gpt_controller.js";
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
gpt_router.post('/', askSimpleQuestionController);


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
gpt_router.post('/humour', askQuestionHumourController);

export default gpt_router;
