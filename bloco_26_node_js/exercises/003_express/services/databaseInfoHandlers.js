function findPersonageById(database, id) {
  const stringToNumber = Number(id);

  const result = database.find(({ id }) => Number(id) === stringToNumber);

  return result;
}

module.exports = { findPersonageById };
