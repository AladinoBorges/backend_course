const db = require('../data/users');

async function getUser(username) {
  return db.findOne({ username }).then((result) => result || null);
}

module.exports = { getUser };
