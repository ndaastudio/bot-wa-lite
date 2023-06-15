const https = require("https");
const fs = require("fs");
const path = require("path");
const { MessageMedia } = require("whatsapp-web.js");
const dotenv = require("dotenv");
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function imageGPT(prompt, client, message) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 2,
    size: "1024x1024",
  });
  const link = response.data.data[0].url;
  const req = https.get(link, (result) => {
    let fileName;
    fileName = path.join(__dirname, "../../media/images/image_result.jpg");
    const fileOutput = fs.createWriteStream(fileName);
    result.pipe(fileOutput);

    fileOutput.on("finish", () => {
      const media = MessageMedia.fromFilePath(fileName);
      client
        .sendMessage(message.from, media, {
          caption: prompt,
        })
        .then(() => {
          fs.unlinkSync(fileName);
        });
    });
  });
  req.on("error", (error) => {
    console.log(error);
  });
}

module.exports = imageGPT;
