import {
  askSimpleQuestionService,
  askQuestionHumourService,
  createLessonPlanService,
  deleteLessonPlanService,
  getPlanByUserService,
  GenerateTopicsFromPlanService,
  getTopicByIDService
} from "../../services/GptServices/gpt_services.js";

export async function askSimpleQuestionController(request, response) {
  try {
    const result = await askSimpleQuestionService(request, response);
    return result;
  } catch (error) {
    console.error("Error in askSimpleQuestionService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function askQuestionHumourController(request, response) {
  try {
    const result = await askQuestionHumourService(request, response);
    return result;
  } catch (error) {
    console.error("Error in askSimpleQuestionService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function createLessonPlanController(request, response) {
  try {
    const result = await createLessonPlanService(request, response);
    return result;
  } catch (error) {
    console.error("Error in createLessonService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteLessonPlanController(request, response) {
  try {
    const result = await deleteLessonPlanService(request, response);
    return result;
  } catch (error) {
    console.error("Error in deleteLessonPlanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function getPlanByUserController(request, response) {
  try {
    const result = await getPlanByUserService(request, response);
    return result;
  } catch (error) {
    console.error("Error in getPlanByUserService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function GenerateTopicsFromPlanController(request, response) {
  try {
    const result = await GenerateTopicsFromPlanService(request, response);
    return result;
  } catch (error) {
    console.error("Error in GenerateTopicsFromPlanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}


export async function getTopicByIDController(request, response) {
  try {
    const result = await getTopicByIDService(request, response);
    return result;
  } catch (error) {
    console.error("Error in getTopicByIDService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}
export default {
  askSimpleQuestionController,
  askQuestionHumourController,
  createLessonPlanController,
  deleteLessonPlanController,
  getPlanByUserController,
  GenerateTopicsFromPlanController,
  getTopicByIDController
};
