const express = require("express");

const app = express();

// ! Observação: Para uma aplicação back-end receber requisições de uma aplicação front-end, ou qualquer outra aplicação, é preciso instalar um módulo que libera o acesso da nossa API para outras aplicações. Para isso basta instalar um módulo chamado cors usando npm i cors e adicionar as duas seguintes linhas no seu arquivo index.js .
const cors = require("cors");
app.use(cors());

const mockedRecipesDatabase = [
  { id: 1, name: "Lasanha", price: 40.0, waitTime: 30 },
  { id: 2, name: "Macarrão a Bolonhesa", price: 35.0, waitTime: 25 },
  { id: 3, name: "Macarrão com molho branco", price: 35.0, waitTime: 25 },
];

// todo: 1. O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.
// todo: 2. O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.
// todo: 3. O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.
// todo: 4. O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.
// todo: 5. O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.
app
  .route("/recipes")
  .get((_request, response) => {
    response.json(mockedRecipesDatabase);
  })
  .post((_request, response) => {});

// * Agora, deixamos de usar o método .send para usar o método .json. O método .send é um método que consegue retornar a resposta de uma requisição de uma forma genérica, adaptando o tipo do retorno ao que vai ser retornado. Mas para deixar mais evidente que o que vamos devolver é um JSON usamos o método .json.

app.listen(3000, () => {
  console.log("Aplicação a ser ouvida na porta 3000.");
});
