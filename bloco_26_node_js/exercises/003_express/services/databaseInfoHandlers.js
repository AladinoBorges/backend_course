function findPersonageById(database, personageId) {
  const stringToNumber = Number(personageId);

  const result = database.find(({ id }) => Number(id) === stringToNumber);

  return result;
}

function checkIfIdExists(database, personageId) {
  const stringToNumber = Number(personageId);

  const result = database.some(({ id }) => Number(id) === stringToNumber);

  return result;
}

function checkIfEmailExists(database, userEmail) {
  const result = database.some(({ email }) => email === userEmail);

  return result;
}

module.exports = { findPersonageById, checkIfIdExists, checkIfEmailExists };
