const User = require("../models/User");

module.exports = async (_request, response) => {
  const usersList = await User.getAll();

  return response.status(200).json(usersList);
};
