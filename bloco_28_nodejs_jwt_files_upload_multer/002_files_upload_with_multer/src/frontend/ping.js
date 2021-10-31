const axios = require('axios');

const URL = 'http://localhost:3000/ping/';

axios
  .get(URL)
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
  })
  .catch((error) => {
    console.log(error);
  });
