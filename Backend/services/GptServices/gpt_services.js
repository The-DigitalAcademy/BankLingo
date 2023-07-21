import configuration from "../../configuration/gpt/gpt_configuration.js";
import { OpenAIApi } from "openai";

const openai = new OpenAIApi(configuration);

export async function askSimpleQuestionService(request, response) {
  try {
    const { message } = request.body;

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: message + "Explain like a 5 year old" },
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

export default askSimpleQuestionService;
