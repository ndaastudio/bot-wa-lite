const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const path = require("path");
const {
  youtubeDownloaderMp3,
  youtubeDownloaderMp4,
} = require("./lib/handler/youtube-downloader");
const sendGreeting = require("./lib/handler/greeting");
const { getMataKuliah, getLinkAbsen } = require("./lib/handler/mata-kuliah");
// const { sendBirtdayText } = require("./lib/handler/birthday");
const notes = require("./lib/notes");
const about = require("./lib/about");
const {
  feedReelDown,
  storiesDown,
} = require("./lib/handler/instagram-downloader");
const tiktokDownloader = require("./lib/handler/tiktok-downloader");
const tanyaGPT = require("./lib/handler/chat-gpt");
const imageGPT = require("./lib/handler/dall-e-image-generator");
const tanyaSimi = require("./lib/handler/chat-simi");
const { playAkinator } = require("./lib/handler/akinator");

const client = new Client({
  authStrategy: new LocalAuth(),
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
    executablePath: "/usr/bin/google-chrome",
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  },
});

client.on("qr", (qr) => {
  console.log("PINDAI KODE INI UNTUK LOGIN KE WHATSAPP");
  qrcode.generate(qr, { small: true });
});

client.on("loading_screen", (msg) => {
  console.log("Loading Chat -", msg);
});

client.on("ready", () => {
  console.log("Client Ready");
  setInterval(() => {
    const idGrup = "120363042661479961@g.us";
    const content = getLinkAbsen();
    if (content !== null) {
      client.sendMessage(idGrup, content);
    }
    // const media = MessageMedia.fromFilePath(
    //   path.join(__dirname, "./media/videos/video_ultah.mp4")
    // );
    // sendBirtdayText(client, "6289674550307@c.us", media);
  }, 1000 * 60);
});

client.on("auth_failure", (msg) => {
  console.log("Autentikasi Gagal", msg);
});

client.initialize();

let isStart = false;
let isTebak = false;
client.on("message", async (message) => {
  let sender = (await message.getContact()).pushname;
  if (isStart === false) {
    if (
      message.body.toLowerCase() === "halo" ||
      message.body.toLowerCase() === "p" ||
      message.body.toLowerCase() === "hai" ||
      message.body.toLowerCase() === "hei" ||
      message.body.toLowerCase() === "woi"
    ) {
      sendGreeting(client, message.from, sender);
    } else if (message.body === "/start") {
      notes(client, message.from);
    } else if (message.body === "/jadwal") {
      let content = getMataKuliah();
      if (content === null) {
        content = "Hari ini tidak ada jadwal kuliah";
        client.sendMessage(message.from, content);
      } else {
        client.sendMessage(message.from, content);
      }
    } else if (message.body.startsWith("/ytmp4 ")) {
      youtubeDownloaderMp4(message.body.split(" ")[1], client, message);
    } else if (message.body === "/ytmp4") {
      const content =
        "Untuk mendownload YouTube, gunakan format */ytmp4 _LINK_YOUTUBE_*\nContoh: /ytmp4 https://youtu.be/w4SLZ8rRcJk";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/ytmp3 ")) {
      youtubeDownloaderMp3(message.body.split(" ")[1], client, message);
    } else if (message.body === "/ytmp3") {
      const content =
        "Untuk mengkonversi YouTube ke MP3, gunakan format */ytmp3 _LINK_YOUTUBE_*\nContoh: /ytmp3 https://youtu.be/w4SLZ8rRcJk";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/igdown ")) {
      feedReelDown(message.body.split(" ")[1], client, message);
    } else if (message.body === "/igdown") {
      const content =
        "Untuk mendownload Feed/Reels, gunakan format */igdown _LINK_POST_*\nContoh: /igdown https://www.instagram.com/p/CpxmyyFLCbX/";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/igstories ")) {
      storiesDown(message.body.split(" ")[1], client, message);
    } else if (message.body === "/igstories") {
      const content =
        "Untuk mendownload IG Stories, gunakan format */igstories _USERNAME_IG_*\nContoh: /igstories instagram";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/ttdown ")) {
      tiktokDownloader(message.body.split(" ")[1], client, message);
    } else if (message.body.toLowerCase() === "/ttdown") {
      const content =
        "Untuk mendownload video TikTok tanpa watermark, gunakan format */ttdown _LINK_TIKTOK_*\nContoh: /ttdown https://vt.tiktok.com/ZSL1uaELT/";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/gpt ")) {
      tanyaGPT(message.body.replace("/gpt ", ""), message);
    } else if (message.body.toLowerCase() === "/gpt") {
      const content =
        "Untuk berinteraksi dengan AI ChatGPT, gunakan format */gpt _KATA_KUNCI_*\nContoh: /gpt apa itu cinta?";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/image ")) {
      imageGPT(message.body.replace("/image ", ""), client, message);
    } else if (message.body.toLowerCase() === "/image") {
      const content =
        "Untuk membuat gambar dengan AI, gunakan format */image _KATA_KUNCI_*\nContoh: /image a cute baby sea otter";
      client.sendMessage(message.from, content);
    } else if (message.body.startsWith("/simi ")) {
      tanyaSimi(message.body.replace("/simi ", ""), message);
    } else if (message.body.toLowerCase() === "/simi") {
      const content =
        "Untuk berinteraksi dengan SimSimi, gunakan format */simi _KATA_KUNCI_*\nContoh: /simi apa itu cinta?";
      client.sendMessage(message.from, content);
    } else if (message.body === "/stiker") {
      if (message.type === "image") {
        const img = await message.downloadMedia();
        client
          .sendMessage(message.from, img, {
            sendMediaAsSticker: true,
            stickerAuthor: "TTI'21 WA BOT",
            stickerName: sender,
          })
          .then(() => {
            client.sendMessage(message.from, "Stiker terkirim!");
          });
      } else {
        const content =
          "/imgtostkr harus diikuti dengan gambar atau foto.\nContoh:";
        client.sendMessage(message.from, content).then(() => {
          const media = MessageMedia.fromFilePath(
            path.join(__dirname, "./media/images/example.png")
          );
          client.sendMessage(message.from, media, {
            caption: "/imgtostkr",
          });
        });
      }
    } else if (
      message.body.toLowerCase() === "/startgame" &&
      isStart === false
    ) {
      isStart = true;
      client.sendMessage(message.from, "Game dimulai!");
      client.sendMessage(
        message.from,
        "Pikirkan tokoh apa yang ingin ditebak, kemudian ketik /tebak"
      );
    } else if (message.body.toLowerCase() === "/tebak" && isStart === false) {
      message.reply(
        "Kamu sudah tidak dalam sesi game! Untuk memulai sesi game, ketik /startgame"
      );
    } else if (message.body.toLowerCase() === "/endgame" && isStart === false) {
      message.reply("Kamu sudah tidak dalam sesi game");
    } else if (message.body === "/about") {
      about(client, message.from);
    }
  } else if (isStart === true) {
    const answerOptions = ["0", "1", "2", "3"];
    if (message.body.toLowerCase() === "/startgame") {
      message.reply("Kamu sudah dalam sesi game!");
    } else if (message.body.toLowerCase() === "/tebak") {
      isTebak = true;
      playAkinator(client, message);
    } else if (message.body.toLowerCase() === "/endgame") {
      isStart = false;
      isTebak = false;
      client.sendMessage(message.from, "Game berakhir!");
    } else if (
      !answerOptions.includes(message.body) &&
      message.body !== "/endgame" &&
      message.body !== "/tebak" &&
      isStart === true
    ) {
      client.sendMessage(
        message.from,
        "Kamu masih dalam sesi game, silahkan selesaikan game terlebih dahulu! Untuk mengakhiri game, ketik /endgame"
      );
    }
  }
});
