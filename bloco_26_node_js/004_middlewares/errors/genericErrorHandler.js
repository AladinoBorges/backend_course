module.exports = (error, _request, response, _next) => {
  if (error.code && error.status) {
    return response.status(error.status).json({ message: error.message, code: error.code });
  }

  return response.status(500).json({ message: error.message });
};
