const fs = require("fs");

function about(client, sender) {
  fs.readFile("./text/about.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.sendMessage(sender, data);
  });
}

module.exports = about;
