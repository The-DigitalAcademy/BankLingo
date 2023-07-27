import SearchHistoryService from "../../services/SearchServices/search_service.js";

export async function searchHistoryController(request, response) {
  try {
    const result = await SearchHistoryService(request, response);
    return result;
  } catch (error) {
    console.error("Error in SearchHistoryService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export default searchHistoryController;