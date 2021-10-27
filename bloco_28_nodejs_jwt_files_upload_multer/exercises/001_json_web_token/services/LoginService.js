const LoginModel = require('../models/LoginModel');

async function getByUsername({ username, password }) {
  const { user, error } = await LoginModel.getByUsername(username);

  if (error) { return { error: { code: 'serverError', message: 'something went wrong' } }; }

  if (!user || user.password !== password) {
    return { error: { code: 'invalidData', message: 'invalid username or password' } };
  }

  return { user };
}

module.exports = { getByUsername };
