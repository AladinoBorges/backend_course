const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const recipes = require("./mocked_databases/recipes.js");
const drinks = require("./mocked_databases/drinks.js");

const mockedRecipesDatabase = [...recipes];
const mockedDrinksDatabase = [...drinks];

const app = express();

app.use(bodyParser.json());
app.use(cors());

// todo: implementar nossa rota que vai receber dados no body da requisição. O PUT serve para criar novos campos (inserir, adicionar) para a nossa base de dados.
app
  .route("/recipes")
  .get((_request, response) => {
    response.status(200).json(mockedRecipesDatabase);
  })
  .post((request, response) => {
    const { id, name, price, waitTime } = request.body;

    mockedRecipesDatabase.push({ id, name, price, waitTime });

    response.status(201).json({ Sucesso: "Receita criada com sucesso" });
  });

app
  .route("/drinks")
  .get((_request, response) => {
    response.status(200).json(mockedDrinksDatabase);
  })
  .post((request, response) => {
    const { id, price, name } = request.body;

    mockedDrinksDatabase.push({ id, name, price });

    response.status(201).json({ Sucesso: "Bebida criada com sucesso." });
  });

// todo: rota que recebe um token para ser validado, a regra da validação é checar se o token possui 16 caracteres.
app.route("/validateToken").get((request, response) => {
  const TOKEN_SIZE = 16;
  const { id, name, price } = request.body;
  const token = request.headers.authorization;

  if (token.length !== TOKEN_SIZE) {
    return response.status(401).json({ Mensagem: "Token inválido." });
  } else {
    response.status(200).json({ Mensagem: "Token válido." });
  }
});

app.listen(3000, () => {
  console.log("Aplicação a ser ouvida na porta 3000.");
});
