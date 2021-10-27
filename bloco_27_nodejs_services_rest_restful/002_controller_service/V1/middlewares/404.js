module.exports = function (_request, response) {
  return response
    .status(404)
    .json({ error: "Page not found.", message: "Estou perdido, algures no espaço ..." });
};
