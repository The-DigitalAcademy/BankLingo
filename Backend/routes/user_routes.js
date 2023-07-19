import createUser from "../controllers/user_controller.js";
import express from "express";
const user_router = express.Router();



/**
 * @openapi
 * '/api/createuser':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Create a User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: string
 *              surnaname:
 *                type: string
 *                default: string
 *              age:
 *                 type: number
 *                 default: 0
 *              email:
 *                 type: string
 *                 default: string
 *              password:
 *                  type: string
 *                  default: string
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
user_router.post("/", createUser);


export default user_router;