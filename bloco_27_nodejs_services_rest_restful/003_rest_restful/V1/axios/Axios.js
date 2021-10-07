require("dotenv").config();

const axios = require("axios");

const { API_TOKEN } = process.env;

const getUrl = "https://postman-echo.com/get?param1=teste";
const postUrl = "https://postman-echo.com/post?param1=teste";
const headers = { Authorization: API_TOKEN };
const body = {
  name: "Edgar Poe",
  email: "edgarpoe@email.com",
  password: "edgarpasswordpoe",
};

axios
  // .get(getUrl, { headers })
  // .post(postUrl)
  .post(postUrl, body, { headers })
  .then((response) => {
    return response.data;
  })
  .then((data) => {
    console.log(data);
  })
  .catch((errorOrResponse) => {
    if (errorOrResponse.status) {
      return console.error(`Request failed with status ${errorOrResponse.status}`);
    } else {
      console.error(errorOrResponse);
    }
  });
