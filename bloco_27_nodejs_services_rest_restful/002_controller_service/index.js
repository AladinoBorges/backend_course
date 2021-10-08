const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const AuthorsRoutes = require('./routes/AuthorsRoutes');
const BooksRoutes = require('./routes/BooksRoutes');

app.use('/authors', AuthorsRoutes);
app.use('/books', BooksRoutes);

// TODO: PERMANENTE
app.all('*', function (_request, _response, next) {
  return next({
    code: 'notFound',
    message: 'Sou a página mais famosa do mundo: Erro 404, nada para ver por aqui',
  });
});

const ErrorMiddleware = require('./middlewares/ErrorsMiddleware');

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
