const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports = function (request, _response, next) {
  const token = request.headers.authorization;

  if (!token) {
    const error = new Error("Token não encontrado.");
    error.statusCode = 401;

    return next(error);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    request.user = payload;

    return next();
  } catch (error) {
    error.statusCode = 401;

    return next(error);
  }
};
