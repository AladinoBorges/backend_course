module.exports = function (_request, response) {
  return response.status(200).json({ secretInfo: "Peter Parker é o Spider-man!" });
};
