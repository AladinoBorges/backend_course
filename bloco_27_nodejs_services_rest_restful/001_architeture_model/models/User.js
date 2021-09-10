const database = require('../mocks/users.json');

async function getUser(username) {
  const user = await database.findOne({ username }).then((result) => result || null);

  return user;
}

module.exports = getUser;
