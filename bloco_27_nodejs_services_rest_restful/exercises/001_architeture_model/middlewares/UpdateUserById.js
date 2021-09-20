const User = require("../models/User");

module.exports = async (request, response) => {
  const { id } = request.params;
  const { firstName, lastName, email, password } = request.body;

  const newData = await User.updateUser(id, firstName, lastName, email, password);

  if (newData) {
    return response.status(200).json(newData);
  } else {
    return response.status(404).json({ error: true, message: "Usuário não encontrado." });
  }
};
