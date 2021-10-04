const express = require('express');
const bodyParser = require('body-parser');

const MoviesController = require('./controllers/MoviesController');

const app = express();

app.use(bodyParser.json());

app.route('/movies').post(MoviesController.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`A ouvir a aplicação na porta ${PORT}`);
});
