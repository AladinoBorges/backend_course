function routeNotFound(error, _request, response, _next) {
  const { statusCode, message } = error;

  response.status(statusCode).json({ message });
}

module.exports = routeNotFound;
