require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Author = require("./controllers/AuthorController.js");
const Book = require("./controllers/BookController.js");

const errorMiddleware = require("./middlewares/error");
const notFound = require("./middlewares/404");

const app = express();

app.use(express.json());
app.use(cors());

app.route("/authors").get(Author.getAll).post(Author.create);
app.route("/authors/:id").get(Author.findById);

app.route("/books").get(Book.getAll).post(Book.create);
app.route("/books/:id").get(Book.findById);

app.route("*").all(notFound);

app.use(errorMiddleware);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
