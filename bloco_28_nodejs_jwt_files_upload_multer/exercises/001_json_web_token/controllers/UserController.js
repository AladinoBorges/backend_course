const rescue = require('express-rescue');

const UserService = require('../services/UserService');

const getByUsername = rescue(async (request, response, next) => {
  const { username, admin } = request.user;

  const { error } = await UserService.getByUsername(username);

  if (error) { return next(error); }

  return response.status(200).json({ username, admin });
});

const topSecret = rescue(async (request, response, next) => {
  const { username, admin } = request.user;

  const { error } = await UserService.getByUsername(username);

  if (error) { return next(error); }
  if (!admin) { return next({ code: 'forbidden', message: 'restricted access' }); }

  return response.status(200).json({ secretIndo: 'Peter Parker is spiderman' });
});

module.exports = { getByUsername, topSecret };
