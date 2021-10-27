const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { ADMIN_NAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;

const LoginService = require('../services/LoginService');

const getByUsername = rescue(async (request, response, next) => {
  const data = request.body;

  const { error } = await LoginService.getByUsername(data);

  if (error) { return next(error); }

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const { username, password } = data;

  const isAdmin = (username === ADMIN_NAME && password === ADMIN_PASSWORD);

  const token = jwt.sign({ data: { username, admin: isAdmin } }, JWT_SECRET, jwtConfig);

  console.log(token);

  return response.status(201).json({ message: 'loged in successfully.', token });
});

module.exports = { getByUsername };
