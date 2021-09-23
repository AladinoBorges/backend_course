const error = require("./error");
const { validateCEP, cepExists, validateRequestBody } = require("./validations");

module.exports = {
  error,
  validateCEP,
  cepExists,
  validateRequestBody,
};
