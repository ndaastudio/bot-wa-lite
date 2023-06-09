const { MessageMedia } = require("whatsapp-web.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const { formatTimes, formatNumbers } = require("./formatter");

async function youtubeDownloaderMp4(url, client, message) {
  const options = {
    filter: "audioandvideo",
  };
  const getVideoId = ytdl.getURLVideoID(url);

  let urlThumbnails, thumbnails;
  let title, duration, author, totalViews;
  let mediaPath;
  let stats;
  let fileSizeInBytes, fileSizeInMegabytes, fileSize;

  if (ytdl.validateURL(url)) {
    ytdl
      .getInfo(url)
      .then((info) => {
        title = info.videoDetails.title.replace(/[\/|]+/g, "-");
        duration = info.videoDetails.lengthSeconds;
        author = info.videoDetails.author.name;
        totalViews = info.videoDetails.viewCount;
        mediaPath = path.join(__dirname, `../../media/videos/${title}.mp4`);
      })
      .then(() => {
        const content = `Video *${title}* akan dikirim, mungkin membutuhkan waktu beberapa menit. Mohon ditunggu...`;
        client.sendMessage(message.from, content);
        urlThumbnails = `https://i.ytimg.com/vi/${getVideoId}/hqdefault.jpg`;
      })
      .then(() => {
        ytdl(url, options)
          .pipe(fs.createWriteStream(mediaPath))
          .on("finish", async () => {
            const media = MessageMedia.fromFilePath(mediaPath);
            stats = fs.statSync(mediaPath);
            fileSizeInBytes = stats.size;
            fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            fileSize = fileSizeInMegabytes.toFixed(2);

            const caption =
              "Judul: " +
              title +
              "\nAuthor: " +
              author +
              "\nDurasi: " +
              formatTimes(duration) +
              "\nViews: " +
              formatNumbers(totalViews) +
              " kali";

            thumbnails = await MessageMedia.fromUrl(urlThumbnails);

            if (fileSize >= 10) {
              await client.sendMessage(message.from, thumbnails);
              await client.sendMessage(message.from, media, {
                sendMediaAsDocument: true,
                caption: false,
              });
              await client.sendMessage(message.from, caption);
            } else {
              await client.sendMessage(message.from, media, {
                sendMediaAsDocument: false,
                caption: caption,
              });
            }
            fs.unlinkSync(mediaPath);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    message.reply("Link YouTube tidak valid");
  }
}

function youtubeDownloaderMp3(url, client, message) {
  let title, author, duration;
  let urlThumbnails;
  let thumbnails;
  let mediaPath;
  let getVideoId = ytdl.getURLVideoID(url);
  const options = {
    filter: "audioonly",
  };

  if (ytdl.validateURL(url)) {
    ytdl
      .getInfo(url)
      .then((info) => {
        title = info.videoDetails.title.replace(/[\/|]+/g, "-");
        author = info.videoDetails.author.name;
        duration = info.videoDetails.lengthSeconds;
        urlThumbnails = `https://i.ytimg.com/vi/${getVideoId}/hqdefault.jpg`;
      })
      .then(async () => {
        client.sendMessage(
          message.from,
          `Musik *${title}* akan dikirim, mungkin membutuhkan waktu beberapa menit. Mohon ditunggu...`
        );
        mediaPath = path.join(__dirname, `../../media/musics/${title}.mp3`);
        thumbnails = await MessageMedia.fromUrl(urlThumbnails);
      })
      .then(() => {
        ytdl(url, options)
          .pipe(fs.createWriteStream(mediaPath))
          .on("finish", async () => {
            await client
              .sendMessage(message.from, thumbnails)
              .then(async () => {
                const media = MessageMedia.fromFilePath(mediaPath);
                await client
                  .sendMessage(message.from, media, {
                    sendMediaAsDocument: true,
                    caption: false,
                  })
                  .then(() => {
                    const caption =
                      "Judul: " +
                      title +
                      "\nAuthor: " +
                      author +
                      "\nDurasi: " +
                      formatTimes(duration);
                    client.sendMessage(message.from, caption);
                    fs.unlinkSync(mediaPath);
                  });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    message.reply("Link YouTube tidak valid");
  }
}

module.exports = { youtubeDownloaderMp4, youtubeDownloaderMp3 };
