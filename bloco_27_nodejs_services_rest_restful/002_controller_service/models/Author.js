const { ObjectId } = require("mongodb");

const connection = require("./connection.js");

function fullnameCreator({ id, authorId, firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(" ");

  const newAuthor = {
    id,
    authorId,
    firstName,
    middleName,
    lastName,
    fullName,
  };

  return newAuthor;
}

async function getAll() {
  const allAuthors = await connection()
    .then((db) => db.collection("authors").find().toArray())
    .then((authors) => {
      const authorsData = authors.map(({ _id, author_id, firstName, middleName, lastName }) =>
        fullnameCreator({
          id: _id,
          authorId: author_id,
          firstName,
          middleName,
          lastName,
        }),
      );

      return authorsData;
    });

  return allAuthors;
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const authorData = await connection().then((db) =>
    db.collection("authors").findOne({ _id: new ObjectId(id) }),
  );

  if (authorData) {
    const { author_id, firstName, middleName, lastName } = authorData;

    const insertedAuthorFullname = fullnameCreator({
      id,
      author_id,
      firstName,
      middleName,
      lastName,
    });

    return insertedAuthorFullname;
  } else {
    return null;
  }
}

async function create(firstName, middleName, lastName, birthday, nationality) {
  const databaseLength = await connection().then((db) => db.collection("authors").countDocuments());

  const author = await connection()
    .then((db) =>
      db.collection("authors").insertOne({
        author_id: databaseLength + 1,
        firstName,
        middleName,
        lastName,
        birthday,
        nationality,
      }),
    )
    .then((result) => {
      const newAuthor = fullnameCreator({
        id: result.insertedId,
        firstName,
        middleName,
        lastName,
        birthday,
        nationality,
      });

      return newAuthor;
    });

  return author;
}

async function findByName(firstName, middleName, lastName) {
  const QUERY = middleName ? { firstName, middleName, lastName } : { firstName, lastName };

  const author = await connection().then((db) => db.collection("authors").findOne(QUERY));

  if (!author) {
    return null;
  } else {
    const insertedAuthorFullname = fullnameCreator(author);

    return insertedAuthorFullname;
  }
}

module.exports = { getAll, findById, create, findByName };
