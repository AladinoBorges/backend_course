function findPersonageById(database, personageId) {
  const stringToNumber = Number(personageId);

  const result = database.find(({ id }) => Number(id) === stringToNumber);

  return result;
}

function checkIfExists(database, personageId) {
  const stringToNumber = Number(personageId);

  const result = database.some(({ id }) => Number(id) === stringToNumber);

  return result;
}

module.exports = { findPersonageById, checkIfExists };
