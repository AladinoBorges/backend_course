const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./src/frontend/send-files/meu-arquivo.txt');

const form = new FormData();

form.append('file', stream);

const formHeaders = form.getHeaders();

const URL = 'http://localhost:3000/files/upload';

axios
  .post(URL, form, { headers: { ...formHeaders } })
  .then((response) => {
    console.log(response.status);
  })
  .catch((error) => {
    console.error(error);
  });
