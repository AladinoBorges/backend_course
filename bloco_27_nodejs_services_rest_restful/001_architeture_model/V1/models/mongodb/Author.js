const { ObjectId } = require("mongodb");

const connection = require("./connection.js");

function fullnameCreator({ id, firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(" ");

  const newAuthor = {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  };

  return newAuthor;
}

async function getAll() {
  const allAuthors = connection()
    .then((db) => db.collection("authors").find().toArray())
    .then((authors) => {
      const authorsData = authors.map(({ _id, firstName, middleName, lastName }) =>
        fullnameCreator({
          id: _id,
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
    const { firstName, middleName, lastName } = authorData;

    const insertedAuthorFullname = fullnameCreator({ id, firstName, middleName, lastName });

    return insertedAuthorFullname;
  } else {
    return null;
  }
}

function dataIsValid(firstName, middleName, lastName, nationality) {
  if (!firstName || typeof firstName !== "string") return false;
  if (!lastName || typeof lastName !== "string") return false;
  if (middleName && typeof middleName !== "string") return false;
  if (nationality && typeof nationality !== "string") return false;

  return true;
}

async function create(firstName, middleName, lastName, birthday, nationality) {
  await connection()
    .then((db) =>
      db
        .collection("authors")
        .insertOne({ firstName, middleName, lastName, birthday, nationality }),
    )
    .then((result) => {
      const newAuthor = fullnameCreator({ id: result.insertedId, firstName, middleName, lastName });

      return newAuthor;
    });
}

module.exports = { getAll, findById, dataIsValid, create };
