const express = require('express');

const MovieRouter = require('./routes/MovieRouter');

const app = express();

app.use(express.json());

app.use('/movies', MovieRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
