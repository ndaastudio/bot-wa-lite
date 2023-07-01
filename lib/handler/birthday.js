const fs = require("fs");
const path = require("path");

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
  console.log("Waktu Sekarang", waktuSekarang);
  if (waktuSekarang == "Minggu 01:00") {
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
  } else {
    return null;
  }
}

module.exports = {
  sendBirtdayText,
};
