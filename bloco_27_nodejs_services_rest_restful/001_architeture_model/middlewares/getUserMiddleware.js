const getUser = require('../models/User.js');

async function getUserMiddleware(request, response, _next) {
  const { username } = request.body;

  const user = await getUser(username);

  if (!user) {
    return response.status(404).json({ message: 'Usuário não encontrado!' });
  } else {
    return response.status(200).json(user);
  }
}

module.exports = getUserMiddleware;
