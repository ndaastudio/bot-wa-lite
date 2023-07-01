const fs = require("fs");
const path = require("path");

function getBirthdayText() {
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
  const textPath = path.join(__dirname, "../../text/birthday.txt");
  if (waktuSekarang == "Sabtu 18:57") {
    fs.readFile(textPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      return data;
    });
  }
  return null;
}

module.exports = {
  getBirthdayText,
};
