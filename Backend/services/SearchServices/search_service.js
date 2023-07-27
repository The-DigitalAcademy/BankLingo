import "dotenv/config.js";
import client from "../../configuration/database/database_configuration.js";
import { request } from "express";

export async function SearchHistoryService(request, response) {
  const user_id = parseInt(request.params.user_id);
  const { query_searched, response_searched } = request.body;

  try {
    const insertQuery = {
      text: "INSERT INTO search_history (query_searched, response_searched, user_id) VALUES ($1, $2, $3) RETURNING *",
      values: [query_searched, response_searched, user_id],
    };

    const results = await client.query(insertQuery);
    return response.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw error;
  }
}

export default SearchHistoryService