const { fileWriter } = require('../services/filesReadAndWrite.js');
const redundanceChecker = require('../services/checkRegistrationRedundance.js');
const tokenGenerator = require('../services/tokenGenerator.js');

const FILEPATH = './mocks/usersDatabase.json';

async function validateRegistrationMiddleware(request, response, next) {
  const { username, email, password } = request.userinfo;

  const usernameOrEmailExists = await redundanceChecker(username, email, FILEPATH);

  if (usernameOrEmailExists) {
    return response.status(400).json({ message: 'User already exists!' });
  } else {
    const newGeneratedToken = tokenGenerator();
    const newUser = { username, email, password, token: newGeneratedToken };

    await fileWriter(FILEPATH, newUser);

    request.usertoken = newGeneratedToken;

    next();
  }
}

module.exports = validateRegistrationMiddleware;
