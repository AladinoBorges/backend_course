const newRecipes =
  ({
    id: 4,
    name: "Macarrão com Frango",
    price: 40,
    waitTime: 25,
  },
  {
    id: 5,
    name: "À la minuta: Enxidos da Casa",
    price: 30,
    waitTime: 45,
  });

const targetId = 3;
const recipesURL = "http://localhost:3000/recipes";
const recipesURLWithId = `http://localhost:3000/recipes/${targetId}`;

function postOnDatabase(URL, content) {
  fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
}

function putOnDatabase(urlWithId, content) {
  fetch(urlWithId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
}

function deleteFromDatabase(urlWithId) {
  fetch(urlWithId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
}

// * method : Método HTTP utilizado, como vimos no primeiro bloco temos 4 que são mais utilizados (GET, POST, PUT e DELETE).

// * headers : Define algumas informações sobre a requisição como o atributo Accept que diz qual o tipo de dado esperado como resposta dessa requisição e o Content-Type que sinaliza que no corpo da requisição está sendo enviado um JSON.

// * body : É o corpo da requisição. Como no HTTP só é possível trafegar texto, é necessário transformar o objeto JavaScript que quermos enviar para uma string JSON. Por isso que do lado do nosso back-end precisamos utilizar o bodyParser para transformar as informações que foram trafegadas como string JSON, de volta para um objeto JavaScript.
