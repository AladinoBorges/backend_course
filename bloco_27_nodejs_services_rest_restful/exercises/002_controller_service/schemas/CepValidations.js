const Joi = require("joi");

const REGEX = /\d{5}-?\d{3}/;
const CEP_LENGTH = 8;

const { findAddressByCEP, getAllAddresses } = require("../models/CepModel");

function isValidCep(cep) {
  const validate = REGEX.test(cep) && cep.replace("-", "").length === CEP_LENGTH;

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

async function findAllAddresses() {
  const addresses = await getAllAddresses();

  if (!addresses) {
    const newError = {
      error: "notFound.",
      message: "Nenhum endereço registrado.",
    };

    return newError;
  } else {
    const data = { addresses };

    return data;
  }
}

async function findAddressByCep(cep) {
  const CEP = await findAddressByCEP(cep);

  if (CEP) {
    const data = { CEP };

    return data;
  } else {
    const newError = {
      error: {
        code: "notFound",
        message: "Nenhum CEP encontrado.",
      },
    };

    return newError;
  }
}

async function checkCepExistence(cep) {
  const CEP = await findAddressByCEP(cep);

  if (CEP) {
    const newError = {
      error: {
        code: "alreadyExists",
        message: "O CEP já se encontra registrado.",
      },
    };

    return newError;
  } else {
    const data = { CEP };

    return data;
  }
}

function validateDataFromRequestBody(data) {
  const requiredNonEmptyString = Joi.string().not().empty().required();

  const { error } = Joi.object({
    cep: Joi.string().replace(/-/g, "").length(CEP_LENGTH).regex(REGEX).required(),
    logradouro: requiredNonEmptyString.max(150),
    bairro: requiredNonEmptyString.max(50),
    localidade: requiredNonEmptyString.max(60),
    uf: requiredNonEmptyString.length(2),
  }).validate(data);

  if (error) {
    const newError = { error };

    return newError;
  } else {
    const data = { status: true };

    return data;
  }
}

module.exports = {
  isValidCep,
  findAllAddresses,
  findAddressByCep,
  checkCepExistence,
  validateDataFromRequestBody,
};
