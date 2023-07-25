import { OpenAIApi } from "openai";
const openai = new OpenAIApi(configuration);

import configuration from "../../configuration/gpt/gpt_configuration.js";
import client from "../../configuration/database/database_configuration.js";

async function planExists(plan_name, user_id) {
  try {
    const planQuery = {
      text: "SELECT * FROM lesson_plan WHERE plan_name = $1 AND user_id = $2",
      values: [plan_name, user_id],
    };
    const planResult = await client.query(planQuery);

    if (planResult && planResult.rows.length === 1) {
      // If the user already has two lesson plans with the same name
      return true;
    } else {
      // The user doesn't have two lesson plans with the same name
      return false;
    }
  } catch (error) {
    console.error("Error checking lesson plan existence:", error);
    throw error;
  }
}

// A user cant have more than 2 plans of the same name
// Select from lesson_plan and look for that plan name,
// get the results
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

export async function GenerateTopicsFromPlanService(request, response) {
  try {
    const { plan_name, duration, plan_id } = request.body;

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me a ${duration} day course  explanation about ${plan_name}  in layman terms, explain the lessonDescription in detail, break the course into ${duration} days, Return as an JSON`,
          },
        ],
      })
      .then(async (res) => {
        let object = {
          message: res.data.choices[0].message.content,
        };

        const insertQuery = {
          text: "INSERT INTO topic ( plan_id,topic_name, topic_description) VALUES ($1, $2, $3) RETURNING *",
          values: [plan_id, plan_name, object.message],
        };
        const result = await client.query(insertQuery);
        return response.status(200).send({
          message: `Plan ${plan_name} has been succesfully added to the DB.`,
        });
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
    const planExistsForUser = await planExists(plan_name, user_id);
    if (planExistsForUser) {
      return response.status(409).json({
        message: `Plan of the name ${plan_name} already Exists! For user with ID ${user_id}`,
      });
    }
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

export async function getPlanByUserService(request, response) {
  const user_id = parseInt(request.params.user_id);
  if (isNaN(user_id)) {
    return response.status(400).json({ message: "Invalid user ID provided." });
  }

  try {
    const insertQuery = {
      text: "SELECT * FROM lesson_plan WHERE user_id = $1",
      values: [user_id],
    };
    const results = await client.query(insertQuery);
    return response.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error finding the Plan:", error);
    throw error;
  }
}

export async function getTopicByIDService(request, response) {
  const plan_id = parseInt(request.params.plan_id);
  if (isNaN(plan_id)) {
    return response.status(400).json({ message: "Invalid plan ID provided." });
  }

  try {
    const insertQuery = {
      text: "SELECT * FROM topic WHERE plan_id = $1",
      values: [plan_id],
    };
    const results = await client.query(insertQuery);
    return response.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error finding the Plan:", error);
    throw error;
  }
}
export default {
  askSimpleQuestionService,
  askQuestionHumourService,
  createLessonPlanService,
  deleteLessonPlanService,
  getPlanByUserService,
  GenerateTopicsFromPlanService,
  getTopicByIDService,
};
