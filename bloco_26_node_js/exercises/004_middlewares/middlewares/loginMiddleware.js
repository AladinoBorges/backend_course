const { emailValidator, passwordValidator } = require('../services/dataValidators.js');
const validateUserLogin = require('../services/loginUserValidator.js');

async function loginMiddleware(request, response, next) {
  const { email, password } = request.body;

  const validateUserData = emailValidator(email) && passwordValidator(password);

  if (!validateUserData) {
    return response.status(400).json({ message: 'Invalid login data.' });
  }

  const userCanlogin = await validateUserLogin(email, password);

  if (!userCanlogin) {
    return response.status(400).json({ message: 'Incorrect email or password.' });
  }

  request.usertoken = userCanlogin;

  next();
}

module.exports = loginMiddleware;
