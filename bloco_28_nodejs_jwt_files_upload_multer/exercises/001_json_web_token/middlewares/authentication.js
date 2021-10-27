const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const byToken = rescue(async (request, _response, next) => {
  const token = request.headers['authorization'];

  if (!token) { return next({ code: 'unauthorized', message: 'token not found' }); }

  try {
    const { data: { username, admin } } = jwt.verify(token, JWT_SECRET);

    const user = { username, admin };

    request.user = user;

    return next();
  } catch ({ message }) {
    return next({ code: 'unauthorized', message });
  }
});

module.exports = { byToken };
