const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const AuthorsRoutes = require('./routes/AuthorsRoutes');
const BooksRoutes = require('./routes/BooksRoutes');
const InvalidEndpoints = require('./routes/InvalidEndpoints');
const ErrorMiddleware = require('./middlewares/ErrorsMiddleware');

app.use('/authors', AuthorsRoutes);
app.use('/books', BooksRoutes);
app.use(InvalidEndpoints);
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
