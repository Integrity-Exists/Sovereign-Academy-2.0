// netlify/functions/ask-sage.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" }),
      };
    }

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: response.data.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
