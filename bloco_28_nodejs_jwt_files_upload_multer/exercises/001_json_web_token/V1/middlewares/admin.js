module.exports = function (request, _response, next) {
  const { user } = request;

  if (!user) {
    const error = new Error("Este endpoint requer autenticação.");
    error.statusCode = 401;

    return next(error);
  }

  if (!user.admin) {
    const error = new Error("Acesso restrito.");
    error.statusCode = 403;

    return next(error);
  } else {
    return next();
  }
};
