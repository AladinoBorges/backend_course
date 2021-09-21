require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Author = require("./controllers/AuthorController.js");
const Book = require("./models/Book.js");

const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cors());

app.route("/authors").get(Author.getAll).post(Author.create);

app.route("/authors/:id").get(Author.findById);

app
  .route("/books")
  .get(async (request, response) => {
    const { author_id } = request.query;

    if (!author_id) {
      const books = await Book.getAll();

      return response.status(200).json(books);
    }

    const books = await Book.searchByAuthorId(author_id);

    if (!books) {
      return response.status(404).json({ message: "No books found!" });
    } else {
      return response.status(200).json(books);
    }
  })
  .post(async (request, response) => {
    const { title, author_id } = request.body;

    const validateData = await Book.dataIsValid(title, author_id);

    if (!validateData) {
      return response.status(400).json({ message: "Invalid data." });
    } else {
      await Book.create(title, author_id);

      return response.status(201).json({ message: "Book created successfully!" });
    }
  });

app.route("/books/:id").get(async (request, response) => {
  const { id } = request.params;

  const book = await Book.findById(id);

  if (!book) {
    return response.status(404).json({ message: "Book not found!" });
  } else {
    return response.status(200).json(book);
  }
});

app.route("*").all(function (_request, response) {
  return response
    .status(404)
    .json({ error: "Page not found.", message: "Estou perdido, algures no espaço ..." });
});

app.use(errorMiddleware);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
