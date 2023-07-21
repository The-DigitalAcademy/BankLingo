import askSimpleQuestionService from "../../services/GptServices/gpt_services.js"

export async function askSimpleQuestionController(request,response){
    try {
        const result = await askSimpleQuestionService(request, response);
        return result;
      } catch (error) {
        console.error("Error in askSimpleQuestionService:", error);
        return response.status(500).json({ message: "Internal server error" });
      }
}



export default { askSimpleQuestionController };