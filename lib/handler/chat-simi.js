const axios = require("axios");
const url = "https://api.simsimi.vn/v2/simtalk";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

function tanyaSimi(prompt, message) {
  const data = {
    text: prompt,
    lc: "id",
    ft: "1.0",
  };
  axios
    .post(url, data, {
      headers: headers,
    })
    .then(function (response) {
      return message.reply(response.data.message);
    })
    .catch(function (error) {
      return message.reply(error);
    });
}

module.exports = tanyaSimi;
