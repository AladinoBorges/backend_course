const { validateCredentials } = require("./utils/validateCredentials");
const { logUser } = require("../services/User");

module.exports = async function (request, response, next) {
  const { error } = validateCredentials(request.body);

  if (error) {
    return next(error);
  }

  const { username, password } = request.body;

  const { error: serviceError, token } = await logUser(username, password);

  if (serviceError && serviceError.code === "invalidCredentials") {
    return next({ statusCode: 401, message: serviceError.message });
  }

  if (serviceError) {
    return next(serviceError);
  } else {
    return response.status(200).json({ token });
  }
};
