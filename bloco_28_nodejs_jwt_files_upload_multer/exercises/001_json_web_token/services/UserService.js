const UserModel = require('../models/UserModel');

async function getByUsername(username) {
  const { error, user } = await UserModel.getByUsername(username);

  if (error) { return { error: { code: 'serverError', message: 'something went wrong' } }; }
  if (!user) { return { error: { code: 'notFound', message: 'user not found' } }; }

  return { user };
}

module.exports = { getByUsername };
