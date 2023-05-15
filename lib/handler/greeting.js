function sendGreeting(client, sender, pushname) {
  const dateNow = new Date();
  const timeNow = dateNow.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const hourNow = timeNow.split(".")[0];
  let greeting;

  if (hourNow >= 0 && hourNow < 12) {
    greeting = "Selamat pagi";
  } else if (hourNow >= 12 && hourNow < 18) {
    greeting = "Selamat siang";
  } else if (hourNow >= 18 && hourNow < 24) {
    greeting = "Selamat malam";
  }

  let content = `${greeting} *${pushname}* 😊\nUntuk melihat apa yang bisa dilakukan oleh bot ini, silahkan ketik /start`;

  client.sendMessage(sender, content);

  return greeting;
}

module.exports = sendGreeting;
