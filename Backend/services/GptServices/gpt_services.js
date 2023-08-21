import { OpenAIApi } from "openai";
import configuration from "../../configuration/gpt/gpt_configuration.js";
import client from "../../configuration/database/database_configuration.js";

const openai = new OpenAIApi(configuration);

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

// This is a piece of code that does something when it receives a request.
// It's written in javascript, which is a language used for web development.

// This function is called "askSimpleInsideTopicService". It's like a helper that takes in a request and response.

export async function askSimpleInsideTopicService(request, response) {
  try {
    // It makes the request to find a "message".
    const { message } = request.body;
    // Then, it talks to a special AI tool called "openai".
    // It asks the AI to explain something using really simple words.
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo", // This is the version of the AI it's using.
        messages: [
          {
            role: "user", // It's pretending to be the user.
            content: `Explain  ${message} like a 5 year old ,explain it in less than 100 words, but in a way i will understand`,
          },
        ],
      })
      .then((res) => {
        // The AI responds with a message.
        // It picks the first message from the AI's response and sends it back.
        let object = {
          message: res.data.choices[0].message.content,
        };
        // Finally, it sends the message back as a response.
        return response.status(200).send(object);
      });
  } catch (error) {
    // If something goes wrong, it shows an error message.
    console.log(error);
  }
}

// This is another piece of code written in javascript for a specific purpose.
// This function is called "GenerateTopicsFromPlanService". It's used to create a plan for teaching something.
export async function GenerateTopicsFromPlanService(request, response) {
  try {
    // The function looks inside the request to find some information about the plan.
    const { plan_name, duration, plan_id } = request.body;
    // Then, it talks to an AI tool called "openai".
    // It asks the AI to generate a lesson plan in the form of a JSON object.
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo", // This is the AI version.
        messages: [
          {
            role: "user", // It's acting like a user.
            content: ` 
            Generate a JSON Object with this kind of structure:
            {
              "course": {
                "title": "Cheque Account Basics",
                "lessons": [
                  {
                    "day": "Day 1",
                    "topics": [
                      "Introduction to Cheque Accounts",
                      "Features and Benefits of Cheque Accounts"
                    ],
                    "covered": false,
                    "description": "On the first day of this course, you will be introduced to cheque accounts and learn about their features and benefits. We will cover topics such as the purpose of cheque accounts, how they work, and the various types of cheques. You will gain a basic understanding of how to open and manage a cheque account."
                  },
                  {
                    "day": "Day 2",
                    "topics": [
                      "Using Cheque Account Services",
                      "Cheque Account Fees and Charges"
                    ],
                    "covered": false,
                    "description": "Day 2 will focus on using cheque account services effectively. We will discuss how to write cheques, process deposits and withdrawals, and use online banking features. Additionally, we will delve into the various fees and charges associated with cheque accounts and provide tips on how to minimize them."
                  }
                ],
                "duration": "2 Days"
              }
            }
            , but the object should be on ${plan_name} instead  of credit cards, and it should be ${duration} days duration, the first lesson plan covered must be true`,
          },
        ],
      })
      .then(async (res) => {
        // The AI responds with a generated lesson plan message.
        // It's saved in an "object" variable.

        // Then, it prepares a query to add the plan and its details to a database.
        // It uses the information from the plan and the generated message.
        let object = {
          message: res.data.choices[0].message.content,
        };

        const insertQuery = {
          text: "INSERT INTO topic ( plan_id,topic_name, topic_description) VALUES ($1, $2, $3) RETURNING *",
          values: [plan_id, plan_name, object.message],
        };
        // It performs the database query and waits for the result.
        const result = await client.query(insertQuery);

        // Finally, it sends a response back to tell that the plan has been successfully added to the database.
        return response.status(200).send({
          message: `Plan ${plan_name} has been succesfully added to the DB.`,
        });
      });
  } catch (error) {
    // If anything goes wrong, it logs an error message.
    console.log(error);
  }
}

// Here's a fun piece of code that knows how to make things funny!
// This function is called "askQuestionHumourService". It's like a laughter helper!
export async function askQuestionHumourService(request, response) {
  try {
    // It looks inside the request to find a "message".
    const { message } = request.body;
    // Then, it chats with a clever AI called "openai".
    // It asks the AI to explain something in a funny way, like talking to a kid who's 5 years old.
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo", // The AI version it uses.
        messages: [
          {
            role: "user", // It's pretending to be you!
            content:
              message +
              "Explain it in a humourous way like i am 5 year old" +
              "explain it in less than 23 words",
          },
        ],
      })
      .then((res) => {
        // The AI comes up with a funny message.
        // It takes the first message from what the AI said and sends it back.
        let object = {
          message: res.data.choices[0].message.content,
        };
        // And finally, it shares the funny message with you!
        return response.status(200).send(object);
      });
  } catch (error) {
    // If something goes wrong, it laughs it off and logs an error message.
    console.log(error);
  }
}

// Hey there, this chunk of code is here to help create a lesson plan – like a roadmap for teaching cool stuff!
// This function is named "createLessonPlanService", and it helps you make a plan.
export async function createLessonPlanService(request, response) {
  const { user_id, plan_name, duration, lesson_description } = request.body;

  try {
    const planExistsForUser = await planExists(plan_name, user_id);
    if (planExistsForUser) {
      return response.status(409).json({
        message: `Plan of the name ${plan_name} already Exists! For user with ID ${user_id}`,
      });
    }
    const insertQuery = {
      text: "INSERT INTO lesson_plan (user_id, plan_name, duration, lesson_description) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [user_id, plan_name, duration, lesson_description],
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
    return response.status(200).json(results.rows);
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

export async function getDaysCountService(request, response) {
  const plan_id = parseInt(request.params.plan_id);

  if (isNaN(plan_id)) {
    return response.status(400).json({ message: "Invalid plan ID provided." });
  }
  try {
    const selectQuery = {
      text: "UPDATE lesson_plan SET days_count = days_count + 1 WHERE plan_id = $1 RETURNING days_count;",
      values: [plan_id],
    };

    const results = await client.query(selectQuery);
    return response.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error finding the Plan:", error);
    throw error;
  }
}

export async function updateCoveredService(request, response) {
  const plan_id = parseInt(request.params.plan_id);
  const day = request.body.day;
  if (isNaN(plan_id)) {
    return response.status(400).json({ message: "Invalid plan ID provided." });
  }

  try {
    const insertQuery = {
      text: `UPDATE topic
      SET topic_description = jsonb_set(
          topic_description,
          '{course, lessons}',
          (
              SELECT jsonb_agg(
                  CASE
                      WHEN (lesson->>'day') = $1 THEN
                          jsonb_set(lesson, '{covered}', 'true')
                      ELSE
                          lesson
                  END
              )
              FROM jsonb_array_elements(topic_description->'course'->'lessons') lesson
          )::jsonb
      )
      WHERE plan_id = $2;`,
      values: [day, plan_id],
    };
    const results = await client.query(insertQuery);
    return response
      .status(200)
      .json({ message: `Plan for ${day} has been updated` });
  } catch (error) {
    console.error("Error finding the Plan:", error);
    throw error;
  }
}
//Exported all the services
export default {
  askSimpleQuestionService,
  askQuestionHumourService,
  createLessonPlanService,
  deleteLessonPlanService,
  getPlanByUserService,
  GenerateTopicsFromPlanService,
  getTopicByIDService,
  askSimpleInsideTopicService,
  updateCoveredService,
  getDaysCountService,
};
