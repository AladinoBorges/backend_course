function isValidCep(cep) {
  const REGEX = /\d{5}-?\d{3}/;

  const validate = REGEX.test(cep) && cep.length === 8;

  if (!validate) {
    const newError = {
      error: {
        code: "invalidData",
        message: "CEP inválido.",
      },
    };

    return newError;
  } else {
    const data = { isValid: validate };

    return data;
  }
}

module.exports = {
  isValidCep,
};
