const fs = require("fs");

function sendBirtdayText(client, targetNumber, media) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dateNow = new Date();
  const dayName = days[dateNow.getDay()];
  const timeNow = dateNow.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const waktuSekarang = `${dayName} ${timeNow}`.replace(".", ":");
  if (waktuSekarang == "Minggu 16:12") {
    fs.readFile("./text/birthday.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      client.sendMessage(targetNumber, data).then(() => {
        client.sendMessage(targetNumber, media, {
          sendMediaAsDocument: false,
        });
      });
    });
  }
}

module.exports = {
  sendBirtdayText,
};
