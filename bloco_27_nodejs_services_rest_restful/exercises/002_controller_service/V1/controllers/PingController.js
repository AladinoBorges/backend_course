module.exports = function (_request, response) {
  return response.status(200).json({ message: "pong!" });
};