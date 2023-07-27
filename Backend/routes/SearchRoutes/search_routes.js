import express from "express";
const search_router = express.Router();

import searchHistoryController from "../../controllers/SearchControllers/search_controller.js";

/**
 * @openapi
 * '/api/search/store_search/{id}':
 *  post:
 *     tags:
 *     - Search Storing
 *     summary: Store the searched values on the DB
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user_id
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              query_searched:
 *                type: string
 *                default: string
 *              response_searched:
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

search_router.post("/store_search/:user_id", searchHistoryController);

export default search_router;
