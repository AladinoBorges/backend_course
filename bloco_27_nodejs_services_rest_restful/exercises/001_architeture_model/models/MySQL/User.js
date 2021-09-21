const connection = require("./connection");

function serializeSnakeToCamelCase(data) {
  const serializedData = {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
  };

  return serializedData;
}

function insertFullname({ id, firstName, lastName, email }) {
  const dataWithFullname = {
    id,
    firstName,
    lastName,
    fullName: firstName + " " + lastName,
    email,
  };

  return dataWithFullname;
}

async function checkExistence(firstName, lastName) {
  const QUERY = "SELECT first_name, last_name FROM users WHERE first_name = ? AND last_name = ?";

  const users = await connection
    .execute(QUERY, [firstName, lastName])
    .then(([results]) => results.map(serializeSnakeToCamelCase))
    .then((users) => users.map(insertFullname));

  if (users.length > 0) {
    return users;
  } else {
    return null;
  }
}

async function getAll() {
  const QUERY = "SELECT * FROM users";

  const users = await connection
    .execute(QUERY)
    .then(([results]) => results.map(serializeSnakeToCamelCase))
    .then((users) => users.map(insertFullname));

  if (users.length > 0) {
    return users;
  } else {
    return null;
  }
}

async function findById(id) {
  const QUERY = "SELECT id, first_name, last_name, email FROM users WHERE id = ?";
  const users = await connection
    .execute(QUERY, [id])
    .then(([results]) => results.map(serializeSnakeToCamelCase))
    .then((users) => users.map(insertFullname));

  if (users.length > 0) {
    return users;
  } else {
    return null;
  }
}

async function createUser(firstName, lastName, email, password) {
  const QUERY = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  const VALUES = [firstName, lastName, email, password];

  const create = await connection
    .execute(QUERY, VALUES)
    .then(([result]) => ({ id: result.insertedId, firstName, lastName, email }));

  return create;
}

async function updateUser(id, firstName, lastName, email, password) {
  const QUERY =
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?";
  const VALUES = [firstName, lastName, email, password, id];

  await connection.execute(QUERY, VALUES);

  const updatedUser = await findById(id);

  if (!updatedUser) {
    return null;
  } else {
    return updatedUser;
  }
}

async function removeUsersByLastName(lastName) {
  const QUERY = "DELETE FROM users WHERE last_name = ?";
  const VALUES = [lastName];

  await connection.execute(QUERY, VALUES);
}

module.exports = {
  checkExistence,
  getAll,
  findById,
  createUser,
  updateUser,
  removeUsersByLastName,
};
