const { ObjectId } = require("mongodb");

const connection = require("./connection.js");
const Author = require("./Author.js");

async function getAll() {
  const allBooks = connection().then((db) => db.collection("books").find().toArray());

  return allBooks;
}

async function searchByAuthorId(targetAuthorId) {
  const allBooks = connection().then((db) =>
    db
      .collection("books")
      .find({ author_id: Number(targetAuthorId) })
      .toArray(),
  );

  return allBooks;
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const bookData = await connection().then((db) =>
    db.collection("books").findOne({ _id: new ObjectId(id) }),
  );

  if (bookData) {
    return bookData;
  } else {
    return null;
  }
}

async function checkAuthorExistence(authorId) {
  const authorExists = await connection().then((db) =>
    db.collection("authors").findOne({ author_id: authorId }),
  );

  if (!authorExists) {
    return null;
  } else {
    return true;
  }
}

async function checkExistenceByTitle(title) {
  const book = await connection().then((db) => db.collection("books").findOne({ title }));

  if (book) {
    return true;
  } else {
    return false;
  }
}

async function create(title, author_id) {
  const newBook = await connection()
    .then((db) => db.collection("books").insertOne({ title, author_id }))
    .then((result) => {
      const book = {
        id: result.insertedId,
        title,
        authorId: author_id,
      };

      return book;
    });

  return newBook;
}

module.exports = {
  getAll,
  searchByAuthorId,
  findById,
  checkAuthorExistence,
  checkExistenceByTitle,
  create,
};
