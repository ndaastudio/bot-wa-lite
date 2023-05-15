const dotenv = require("dotenv");
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function tanyaGPT(prompt, message) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 255,
  });
  return message.reply(response.data.choices[0].text.replace(/^\n{0,2}/, ""));
}

module.exports = tanyaGPT;
