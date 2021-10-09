const { ObjectId } = require('mongodb');

const BookModel = require('../models/mongo/BookModel');
// const AuthorModel = require('../models/mongo/AuthorModel');

function serialize({ id, title, authorId }) {
  return { id, title, authorId };
}

async function getAll() {
  const books = await BookModel.getAll().then((books) =>
    books.map(({ _id, title, authorId }) => {
      return serialize({ id: _id, title, authorId });
    }),
  );

  return books;
}

async function getById(id) {
  // if (!ObjectId.isValid(id)) {
  //   return {
  //     error: {
  //       code: 'invalidData',
  //       message: 'O id é inválido',
  //     },
  //   };
  // }

  const book = await BookModel.getById(id);

  if (!book) {
    return {
      error: {
        code: 'notFound',
        message: `Nenhum livro encontrado com o id ${id}`,
      },
    };
  }

  const { title, authorId } = book;

  return [{ id, title, authorId }];
}

// async function isValid({ title, authorId }) {
//   if (!authorId || !title || typeof title !== 'string') {
//     return false;
//   }

//   const authorExists = await AuthorModel.getById(authorId);

//   if (!authorExists) {
//     return false;
//   }

//   return true;
// }

async function create(bookData) {
  // const isValidData = await isValid(bookData);

  // if (!isValidData) {
  //   return {
  //     error: {
  //       code: 'invalidData',
  //       message: 'Dados inválidos',
  //     },
  //   };
  // }

  // const bookExists = await BookModel.findByTitleAndAuthorId(bookData);

  // if (bookExists) {
  //   return {
  //     error: {
  //       code: 'alreadyExists',
  //       message: 'Este livro já se encontra cadastrado',
  //     },
  //   };
  // }

  const book = await BookModel.create(bookData);

  return [book];
}

module.exports = { getAll, getById, create };
