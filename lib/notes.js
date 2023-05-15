const fs = require("fs");

function notes(client, sender) {
  fs.readFile("./text/notes.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.sendMessage(sender, data);
  });
}

module.exports = notes;
