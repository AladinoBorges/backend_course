const connection = require("./connection.js");

const formatCEP = require("../services/dataFormaters");

async function getAllAddresses() {
  const QUERY = "SELECT * FROM ceps";

  const addresses = await connection
    .execute(QUERY)
    .then(([results]) => results.map((address) => ({ ...address, cep: formatCEP(address.cep) })));

  if (addresses) {
    return addresses;
  } else {
    return null;
  }
}

async function findAddressByCEP(targetCEP) {
  const formatedCEP = targetCEP.replace("-", "");

  const QUERY = "SELECT * FROM ceps WHERE cep = ?";

  const address = await connection
    .execute(QUERY, [formatedCEP])
    .then(([results]) => (results.length ? results[0] : null));

  if (address) {
    const addressFormated = { ...address, cep: formatCEP(address.cep) };

    return addressFormated;
  } else {
    return null;
  }
}

async function createCEP(cep, logradouro, bairro, localidade, uf) {
  const unformatedCEP = cep.replace("-", "");

  const QUERY = "INSERT INTO ceps (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?)";

  await connection.execute(QUERY, [unformatedCEP, logradouro, bairro, localidade, uf]);

  return { cep: formatCEP(unformatedCEP), logradouro, bairro, localidade, uf };
}

module.exports = { getAllAddresses, findAddressByCEP, createCEP };
