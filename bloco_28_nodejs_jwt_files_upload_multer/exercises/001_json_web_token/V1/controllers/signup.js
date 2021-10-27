const { validateCredentials } = require("./utils/validateCredentials");

const service = require("../services/User");

module.exports = async function (request, response, next) {
  const { error: validationError } = validateCredentials(request.body);

  if (validationError) {
    return next(validationError);
  }

  const { username, password } = request.body;

  const result = await service.createUser(username, password);
  const { error, token } = result;

  if (!error) {
    return response.status(201).json(token);
  }

  if (error.code === "usernameExists") {
    return response.status(409).json({ message: error.message });
  }
};
