import "dotenv/config.js";
import client from "../../configuration/database/database_configuration.js";
import { request } from "express";

export async function SearchHistoryService(request, response) {
  const user_id = parseInt(request.params.user_id);
  const { query_searched, response_searched, ishumour } = request.body;

  try {
    const insertQuery = {
      text: "INSERT INTO search_history (query_searched, response_searched, user_id, ishumour) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [query_searched, response_searched, user_id, ishumour],
    };

    const results = await client.query(insertQuery);
    return response.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw error;
  }
}

export async function getSearchHistoryLimitService(request, response) {
  const user_id = parseInt(request.params.user_id);
  try {
    const insertQuery = {
      text: "SELECT * FROM search_history  WHERE user_id = $1 ORDER BY date_created DESC LIMIT 7 OFFSET 0",
      values: [user_id],
    };
    const results = await client.query(insertQuery);

    return response.status(200).json(results.rows);
  } catch (error) {
    console.error("Error saving user to the database:", error);
    return response
      .status(500)
      .send({ message: "Search history for user does not exist" });
  }
}
export async function deleteSearchHistoryByIdService(request, response) {
  const search_id = parseInt(request.params.id);
  try {
    const insertQuery = {
      text: "DELETE FROM search_history WHERE id = $1;",
      values: [search_id],
    };
    const results = await client.query(insertQuery);
    return response.status(200).json({message : `favorite of id: ${search_id} has been deleted`})
  } catch (error) {
    console.error("Failed to delete the favorite:", error);
    return response
      .status(500)
      .send({ message: "Search history for user does not exist" });
  }
}

export default { SearchHistoryService, getSearchHistoryLimitService, deleteSearchHistoryByIdService };
