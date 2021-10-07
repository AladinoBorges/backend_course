const connection = require("../models/connection.js");

const fetcher = require("node-fetch");

async function getCepFromExternalSource() {
  const URL = "https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/";
  const response = await fetcher(URL);

  if (!response.ok) {
    return null;
  }

  const address = await response.json();

  if (address.erro) {
    return null;
  } else {
    const newAddresses = address.map(({ cep, logradouro, bairro, localidade, uf }) => {
      const newAddress = { cep, logradouro, bairro, localidade, uf };

      return newAddress;
    });

    return newAddresses;
  }
}

async function create() {
  const data = await getCepFromExternalSource();

  if (!data) return null;

  const QUERY = "INSERT INTO ceps (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?)";

  data.forEach(({ cep, logradouro, bairro, localidade, uf }) => {
    console.log({ cep, logradouro, bairro, localidade, uf });

    const newCEP = cep.replace("-", "");

    connection.execute(QUERY, [newCEP, logradouro, bairro, localidade, uf]);
  });
}

module.exports = create;
