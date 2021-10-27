const {
  usernameValidator,
  emailValidator,
  passwordValidator,
} = require('../services/dataValidators.js');

function registrationMiddleware(request, response, next) {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(401).json({ message: 'Username, password and email cannot be blank!' });
  }

  const validateRegistration =
    usernameValidator(username) && passwordValidator(password) && emailValidator(email);

  if (!validateRegistration) {
    return response.status(400).json({ message: 'Invalid registration data.' });
  }

  request.userinfo = { username, email, password };

  next();
}

module.exports = registrationMiddleware;
