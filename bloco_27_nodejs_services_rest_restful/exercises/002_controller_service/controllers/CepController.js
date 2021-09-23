const { isValidCep } = require("../schemas/CepValidations");

module.exports = function (request, response, next) {
  const { cep } = request.params;

  const { isValid, error } = isValidCep(cep);

  if (isValid) {
    return response.status(200).json({ message: "CEP válido.", cep });
  } else {
    return next(error);
  }
};
