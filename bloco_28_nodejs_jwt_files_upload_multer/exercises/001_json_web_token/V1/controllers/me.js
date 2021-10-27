module.exports = function (request, response) {
  const { username, admin } = request.user;

  return response.status(200).json({ username, admin });
};
