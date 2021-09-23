const rescue = require("express-rescue");

const { findAddressByCep, findAllAddresses } = require("../schemas/CepValidations");

const cepModel = require("../models/CepModel");

const findAllAdresses = rescue(async function (_request, response, next) {
  const { addresses, error } = await findAllAddresses();

  if (error) {
    return next(error);
  } else {
    return response.status(200).json(addresses);
  }
});

const findAddressByCEP = rescue(async function (request, response, next) {
  const { cep } = request.params;

  const { CEP, error } = await findAddressByCep(cep);

  if (error) {
    return next(error);
  } else {
    return response.status(200).json(CEP);
  }
});

const createNewAddress = rescue(async function (request, response) {
  const { cep, logradouro, bairro, localidade, uf } = request.body;

  const newCEP = await cepModel.createCEP(cep, logradouro, bairro, localidade, uf);

  return response.status(201).json(newCEP);
});

module.exports = { findAllAdresses, findAddressByCEP, createNewAddress };
