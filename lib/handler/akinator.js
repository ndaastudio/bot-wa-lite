const { Aki } = require("aki-api");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { MessageMedia } = require("whatsapp-web.js");

async function playAkinator(client, message) {
  try {
    const region = "id";
    const aki = new Aki({ region });
    await aki.start();
    let question = aki.question;

    while (aki.progress <= 85) {
      const answer = await askQuestion(question, message);
      await aki.step(answer);
      question = aki.question;
    }

    const guess = await aki.win();
    resultGuess(guess, client, message);
  } catch (error) {
    console.error("Akinator Error:", error);
  }
}

function askQuestion(question, message) {
  message.reply(
    question +
      "\n\nPilihan Jawaban:\n0 = Ya\n1 = Tidak\n2 = Saya Tidak Tahu\n3 = Mungkin"
  );
  return new Promise((resolve) => {
    const filter = (msg) => {
      const answerOptions = ["0", "1", "2", "3"];
      if (answerOptions.includes(msg.body)) {
        resolve(msg.body);
      }
    };
    message.client.on("message", filter);
  });
}

function resultGuess(guess, client, message) {
  const link = guess.guesses[0].absolute_picture_path;
  const req = https.get(link, (result) => {
    let fileName;
    fileName = path.join(
      __dirname,
      `../../media/images/${guess.guesses[0].name}.jpg`
    );
    const fileOutput = fs.createWriteStream(fileName);
    result.pipe(fileOutput);

    fileOutput.on("finish", () => {
      const media = MessageMedia.fromFilePath(fileName);
      client
        .sendMessage(message.from, media, {
          caption: `Saya yakin jawabannya adalah *${guess.guesses[0].name}*`,
        })
        .then(() => {
          fs.unlinkSync(fileName);
          client.sendMessage(
            message.from,
            "Jika ingin bermain lagi, ketik /tebak"
          );
        });
    });
  });
  req.on("error", (error) => {
    console.log(error);
  });
}

module.exports = { playAkinator };
