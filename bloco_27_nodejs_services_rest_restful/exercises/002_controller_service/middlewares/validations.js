const {
  isValidCep,
  checkCepExistence,
  validateDataFromRequestBody,
} = require("../schemas/CepValidations");

function validateCEP(request, _response, next) {
  const { cep } = request.params;

  const { isValid, error } = isValidCep(cep);

  if (isValid) {
    return next();
  } else {
    return next(error);
  }
}

async function cepExists(request, _response, next) {
  const { cep } = request.body;

  const { error } = await checkCepExistence(cep);

  if (!error) {
    return next();
  } else {
    return next(error);
  }
}

function validateRequestBody(request, _response, next) {
  const { error } = validateDataFromRequestBody(request.body);

  if (error) {
    return next(error);
  } else {
    return next();
  }
}

module.exports = { validateCEP, cepExists, validateRequestBody };
