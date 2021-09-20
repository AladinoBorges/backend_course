const User = require("../models/User");

module.exports = async (request, response) => {
  const { id } = request.params;

  const targetUser = await User.findById(id);

  if (targetUser) {
    return response.status(200).json(targetUser);
  } else {
    return response.status(404).json({ error: true, message: "Usuário não encontrado." });
  }
};
