const User = require("../models/User");

module.exports = async function (request, response) {
  const { firstName, lastName, email, password } = request.body;
  const userExists = await User.checkExistence(firstName, lastName);

  if (userExists) {
    return response
      .status(400)
      .json({ error: true, message: "O usuário já se encontra registrado." });
  } else {
    const newUser = await User.createUser(firstName, lastName, email, password);

    return response.status(200).json({ message: "Usuário criado com sucesso.", data: newUser });
  }
};
