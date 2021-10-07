const fetcher = require("node-fetch");

async function getCepFromExternalSource(cep) {
  const API_URL = `https://viacep.com.br/ws/${cep}/json`;

  const response = await fetcher(API_URL);

  if (!response.ok) {
    return null;
  }

  const address = await response.json();

  if (address.erro) {
    return null;
  } else {
    return address;
  }
}

getCepFromExternalSource("91420-270");

module.exports = getCepFromExternalSource;
