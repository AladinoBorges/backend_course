module.exports = function (_request, response) {
  return response.status(404).json({ message: "Página não encontrada." });
};
