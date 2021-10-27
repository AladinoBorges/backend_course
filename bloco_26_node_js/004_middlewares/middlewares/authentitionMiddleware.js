const authorizedUsers = require('../mocks/users.json');

function userValidator(database, targetUsername, targetPassword) {
  const validate = database.some(
    ({ username, password }) =>
      username === String(targetUsername) && password === String(targetPassword),
  );

  return validate;
}

function userFinder(database, targetUsername) {
  const user = database.find(({ username }) => username === String(targetUsername));

  return user;
}

function authentitionMiddleware(request, response, next) {
  const { username, password } = request.headers;

  if (!username || !password) {
    return response.status(401).json({ message: `Username and password can't be blank!` });
  }

  const validatedUser = userValidator(authorizedUsers, username, password);

  if (!validatedUser) {
    return response.status(401).json({ message: 'Invalid credentials!' });
  }

  const foundUser = userFinder(authorizedUsers, username);

  request.user = foundUser;

  next();
}

module.exports = authentitionMiddleware;
