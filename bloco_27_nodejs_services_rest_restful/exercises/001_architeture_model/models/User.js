const { ObjectId } = require("mongodb");

const connection = require("./connection");

async function checkExistence(firstName, lastName) {
  const userExists = await connection().then((db) =>
    db.collection("users").findOne({ firstName, lastName }),
  );

  return userExists;
}

async function getAll() {
  const usersList = await connection()
    .then((db) => db.collection("users").find().toArray())
    .then((users) => {
      const formatedData = users.map(({ _id, firstName, lastName, email }) => ({
        id: _id,
        firstName,
        lastName,
        email,
      }));

      return formatedData;
    });

  return usersList;
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const userData = await connection().then((db) =>
    db.collection("users").findOne({ _id: new ObjectId(id) }),
  );

  if (userData) {
    const { firstName, lastName, email } = userData;
    const formatedData = { fullName: `${firstName} ${lastName}`, email };

    return formatedData;
  } else {
    return null;
  }
}

async function createUser(firstName, lastName, email, password) {
  const create = await connection()
    .then((db) => db.collection("users").insertOne({ firstName, lastName, email, password }))
    .then((result) => {
      const userData = { id: result.insertedId, firstName, lastName, email };

      return userData;
    });

  return create;
}

async function updateUser(id, firstName, lastName, email, password) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const userId = new ObjectId(id);
  const newData = { firstName, lastName, email, password };

  const updatedUser = await connection().then((db) =>
    db
      .collection("users")
      .findOneAndUpdate({ _id: userId }, { $set: newData }, { returnOriginal: false })
      .then((result) => result.value),
  );

  if (!updatedUser) {
    return null;
  } else {
    return updatedUser;
  }
}

async function removeUsersByLastName(lastName) {
  await connection().then((db) => db.collection("users").deleteMany({ lastName }));
}

module.exports = {
  checkExistence,
  getAll,
  findById,
  createUser,
  updateUser,
  removeUsersByLastName,
};
