const express = require('express');

const app = express();

app.use(express.json());

const { PORT = 3000 } = process.env;

app.listen(PORT, function () {
  return console.log(`Aplicação a rodar na porta ${PORT}`);
});
