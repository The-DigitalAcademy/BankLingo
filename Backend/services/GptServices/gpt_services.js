import { OpenAIApi } from "openai";
const openai = new OpenAIApi(configuration);

import configuration from "../../configuration/gpt/gpt_configuration.js";
import client from "../../configuration/database/database_configuration.js";

export async function askSimpleQuestionService(request, response) {
  try {
    const { message } = request.body;

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              message +
              "Explain like a 5 year old" +
              "explain it in less than 23 words",
          },
        ],
      })
      .then((res) => {
        let object = {
          message: res.data.choices[0].message.content,
        };
        return response.status(200).send(object);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function askQuestionHumourService(request, response) {
  try {
    const { message } = request.body;

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              message +
              "Explain it in a humourous way like i am 5 year old" +
              "explain it in less than 23 words",
          },
        ],
      })
      .then((res) => {
        let object = {
          message: res.data.choices[0].message.content,
        };
        return response.status(200).send(object);
      });
  } catch (error) {
    console.log(error);
  }
}
export async function createLessonPlanService(request, response) {
  const { user_id, plan_name, duration } = request.body;

  try {
    const insertQuery = {
      text: "INSERT INTO lesson_plan (user_id, plan_name, duration) VALUES ($1, $2, $3) RETURNING *",
      values: [user_id, plan_name, duration],
    };

    const results = await client.query(insertQuery);
    return response.status(201).json(results.rows);
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw error;
  }
}

export async function deleteLessonPlanService(request, response) {
  const plan_id = parseInt(request.params.plan_id);
  if (isNaN(plan_id)) {
    return response
      .status(400)
      .json({ message: "Invalid server ID provided." });
  }
  try {
    const insertQuery = {
      text: "DELETE FROM lesson_plan WHERE plan_id = $1",
      values: [plan_id],
    };
    const results = await client.query(insertQuery);
    return response
      .status(200)
      .json({ message: `Plan with id: ${plan_id} has been removed!` });
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw error;
  }
}
export default {
  askSimpleQuestionService,
  askQuestionHumourService,
  createLessonPlanService,
  deleteLessonPlanService,
};
