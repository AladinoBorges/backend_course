const User = require("../models/User");

module.exports = async (request, response) => {
  const { lastName } = request.body;

  await User.removeUsersByLastName(lastName);

  response
    .status(200)
    .json({ message: `Usuários com o sobrenome ${lastName} apagados com sucesso.` });
};
