const Book = require("../models/Book");

async function getAll() {
  const books = await Book.getAll();

  return books;
}

async function searchByAuthorId(authorId) {
  const books = await Book.searchByAuthorId(authorId);

  if (!books.length) {
    return {
      error: {
        code: "notFound",
        message: `Não foi encontrado nenhum livro registrado com o autor com o id ${authorId}.`,
      },
    };
  } else {
    return books;
  }
}

async function findById(id) {
  const book = await Book.findById(id);

  if (!book) {
    return {
      error: {
        code: "notFound",
        message: `Não foi possível encontrar um livro com o id: ${id}.`,
      },
    };
  } else {
    return book;
  }
}

async function create(title, authorId) {
  const authorExists = await Book.checkAuthorExistence(authorId);

  if (!authorExists) {
    return {
      error: {
        code: "notFound",
        message: `Nenhum autor registrado com o id ${authorId}.`,
      },
    };
  }

  const bookExists = await Book.checkExistenceByTitle(title);

  if (authorExists && !bookExists) {
    const newAuthor = await Book.create(title, authorId);

    return newAuthor;
  } else {
    return {
      error: {
        code: "alreadyExists",
        message: `Um livro com o título '${title}' já se encontra registrado na base de dados.`,
      },
    };
  }
}

module.exports = { getAll, searchByAuthorId, findById, create };
