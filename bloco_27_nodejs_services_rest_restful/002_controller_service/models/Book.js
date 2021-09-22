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
      .find({ authorId: Number(targetAuthorId) })
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
  const authorExists = await Author.findById(authorId);

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

async function create(title, authorId) {
  const newBook = await connection()
    .then((db) => db.collection("books").insertOne({ title, authorId }))
    .then((result) => {
      const book = {
        id: result.insertedId,
        title,
        authorId,
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
