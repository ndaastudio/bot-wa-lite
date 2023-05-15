const path = require("path");
const ttdl = require("tiktok-video-downloader");
const https = require("https");
const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

function tiktokDownloader(url, client, message) {
  let author, totalViews, loves, backsound;
  let urlNoWM;
  let fileName;
  let caption;
  ttdl
    .getInfo(url)
    .then((result) => {
      author = result.author.name;
      totalViews = result.video.views;
      loves = result.video.loves;
      backsound = result.backsound.name;
      urlNoWM = result.video.url.no_wm;
      thubnails = result.video.thumbnail;

      if (urlNoWM === undefined) {
        fileName = path.join(
          __dirname,
          "../../media/videos/" +
            result.author.name +
            result.video.loves +
            ".jpg"
        );
      } else {
        fileName = path.join(
          __dirname,
          "../../media/videos/" +
            result.author.name +
            result.video.loves +
            ".mp4"
        );
      }
    })
    .then(() => {
      caption =
        "Author: " +
        author +
        "\nViews: " +
        totalViews +
        "\nLikes: " +
        loves +
        "\nBacksound: " +
        backsound;
    })
    .then(() => {
      const req = https.get(urlNoWM, (res) => {
        const content = `Video dari *${author}* akan dikirim, mungkin membutuhkan waktu beberapa menit. Mohon ditunggu...`;
        client.sendMessage(message.from, content);

        const fileOutput = fs.createWriteStream(fileName);
        res.pipe(fileOutput);

        fileOutput.on("finish", () => {
          const media = MessageMedia.fromFilePath(fileName);
          client
            .sendMessage(message.from, media, {
              caption: caption,
            })
            .then(() => {
              fs.unlinkSync(fileName);
            });
        });
      });
      req.on("error", (err) => {
        console.log(err);
        const content = "Link video TikTok tidak valid";
        message.reply(content);
      });
    });
}

module.exports = tiktokDownloader;
