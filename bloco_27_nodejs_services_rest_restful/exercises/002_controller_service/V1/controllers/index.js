const PingController = require("./PingController");
const { findAllAdresses, findAddressByCEP, createNewAddress } = require("./CepController");

module.exports = {
  PingController,
  findAllAdresses,
  findAddressByCEP,
  createNewAddress,
};
