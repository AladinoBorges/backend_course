const UserModel = require('../models/UserModel');

async function getUserMiddleware(request, response, next) {
  const { username } = request.body;

  const user = await UserModel.getUser(username);

  if (!user) {
    return response.status(404).json({ essage: 'user não encontrado' });
  }

  return response.status(200).json(user);
}
