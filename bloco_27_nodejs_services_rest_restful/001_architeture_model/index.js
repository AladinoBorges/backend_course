const express = require("express");
const cors = require("cors");

const Author = require("./models/mongodb/Author.js");
const Book = require("./models/mongodb/Book.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app
  .route("/authors")
  .get(async (_request, response) => {
    const authors = await Author.getAll();

    return response.status(200).json(authors);
  })
  .post(async (request, response) => {
    const { first_name, middle_name, last_name, birthday, nationality } = request.body;

    const validateData = Author.dataIsValid(first_name, middle_name, last_name, nationality);

    if (!validateData) {
      return response.status(400).json({ message: "Invalid data." });
    } else {
      await Author.create(first_name, middle_name, last_name, birthday, nationality);

      return response.status(201).json({ message: "Author created successfully!" });
    }
  });

app.route("/authors/:id").get(async (request, response) => {
  const { id } = request.params;

  const author = await Author.findById(id);

  if (!author) {
    return response.status(404).json({ messange: "Author not found!" });
  } else {
    return response.status(200).json(author);
  }
});

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

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
