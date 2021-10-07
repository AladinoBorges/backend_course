const express = require('express');
const bodyParser = require('body-parser');

const AuthorModel = require('./models/AuthorModel');
const BookModel = require('./models/BookModel');

const app = express();
app.use(bodyParser.json());

app.get('/authors', async function (_request, response) {
  const authors = await AuthorModel.getAll();

  return response.status(200).json(authors);
});

app.get('/books', async function (_request, response) {
  const books = await BookModel.getAll();

  return response.status(200).json(books);
});


app.get('/authors/:id', async function (request, response) {
  const { id } = request.params;

  const author = await AuthorModel.getById(id);

  if (!author) {
    return response.status(404).json({
      error: 'notFound',
      message: 'Autor não encontrado',
    });
  }

  return response.status(200).json(author);
});

app.get('/books/:id', async function (request, response) {
  const { id } = request.params;

  const book = await BookModel.getById(id);

  if (!book) {
    return response.status(404).json({
      error: 'notFound',
      message: 'Livro não encontrado',
    });
  }

  return response.status(200).json(book);
});

app.post('/authors', async function (request, response) {
  const { body } = request;

  const createdWithSuccess = await AuthorModel.create(body);

  if (!createdWithSuccess) {
    return response.status(400).json({
      error: 'invalidData',
      message: 'Falha ao criar um novo autor',
    });
  }

  return response.status(200).json({ message: 'Autor criado com sucesso' });
});

app.post('/books', async function (request, response) {
  const { body } = request;

  const createdWithSuccess = await BookModel.create(body);

  if (!createdWithSuccess) {
    return response.status(400).json({
      error: 'invalidData',
      message: 'Falha ao criar um novo livro',
    });
  };

  return response.status(200).json({ message: 'Livro criado com sucesso' });
});

// TODO: PERMANENTE

app.all('*', function (_request, response) {
  return response.status(404).json({ error: 'notFound', message: 'Página não encontrada.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
