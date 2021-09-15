const jwt = require("jsonwebtoken");
const model = require("../../models/user");

const privateKey = "qa1ws2ed3rf4tg5yh6";

module.exports = async function (request, response, next) {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(401).json({ error: "Token não encontrado ou informado!" });
  }

  try {
    const decoded = jwt.verify(token, privateKey);

    const user = await model.findUser(decoded.data.username);

    if (!user) {
      return response.status(401).json({ message: "Erro ao procurar o usuário do token." });
    }

    request.user = user;

    next();
  } catch ({ message }) {
    return response.status(401).json({ message });
  }
};
