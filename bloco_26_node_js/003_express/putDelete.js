const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const recipes = require("./mocked_databases/recipes.js");
const drinks = require("./mocked_databases/drinks.js");

const mockedRecipesDatabase = [...recipes];
const mockedDrinksDatabase = [...drinks];

const MINUS_X = -1;

const app = express();

app.use(bodyParser.json());
app.use(cors());

function indexFinder(database, id) {
  const stringToNumber = Number(id);

  const result = database.findIndex(({ id }) => id === stringToNumber);

  return result;
}

// ? Além dos métodos GET (retorna os objetos quando encontrados) E POST (cria um novo objeto), o HTTP também possui os métodos PUT e DELETE que são convencionalmente utilizados para rotas que, respectivamente, editam e removem objetos. O Express tem métodos específicos para definir rotas para esses dois verbos. Vamos começar dando um exemplo do uso do PUT.

app.route("/recipes").get((_request, response) => {
  response.status(200).json(mockedRecipesDatabase);
});

app.route("/drinks").get((_request, response) => {
  response.status(200).json(mockedDrinksDatabase);
});

// todo: PUT e DELETE.
app
  .route("/recipes/:id")
  .put((request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const recipeIndex = indexFinder(mockedRecipesDatabase, id);

    if (recipeIndex === MINUS_X) {
      return response
        .status(404)
        .status({ Mensagem: "Receita não encontrada." });
    } else {
      mockedRecipesDatabase[recipeIndex] = {
        ...mockedRecipesDatabase[recipeIndex],
        name,
        price,
      };

      response.status(204).end(); // * Como utilizamos o .end() no nosso callback da rota PUT /recipes/:id não retornamos nada, apenas o status 204, que indica que a requisição foi completada com sucesso.
    }
  })
  .delete((request, response) => {
    const { id } = request.params; //* novamente utilizamos o id como parâmetro de rota. Essa é uma convenção que como vimos, serve para sempre que precisamos trabalhar com id seja para pesquisar, editar e remover objetos através da nossa API. É possível fazer a mesma coisa enviando o id como query string ou no body da requisição, mas usar parâmetro de rota acaba sendo a forma mais simples de mandar esse tipo de dado entre todas as opções disponíveis.
    const recipeIndex = indexFinder(mockedRecipesDatabase, id);

    if (recipeIndex === MINUS_X) {
      return response.status(404).json({ Mensagem: "Receita não encontrada." });
    } else {
      mockedRecipesDatabase.splice(recipeIndex, 1);

      response.status(204).end();
    }
  });

app
  .route("/drinks/:id")
  .put((request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const drinkIndex = indexFinder(mockedDrinksDatabase, id);

    if (drinkIndex === MINUS_X) {
      return response(404).json({ Mensagem: "Bebida não encontrada." });
    } else {
      mockedDrinksDatabase[drinkIndex] = {
        ...mockedDrinksDatabase[drinkIndex],
        name,
        price,
      };

      response.status(204).end();
    }
  })
  .delete((request, response) => {
    const { id } = request.params;

    const drinkIndex = indexFinder(mockedDrinksDatabase, id);

    if (drinkIndex === MINUS_X) {
      return response.status(404).json({ Mensagem: "Bebida não encontrada." });
    } else {
      mockedDrinksDatabase.splice(drinkIndex, 1);

      response.status(204).end();
    }
  });

// ! O que acontece se a rota não existir ou como tratar isso: se tentarmos fazer uma requisição para uma rota que não mapeamos na noss API, você vai observar que o Express retorna uma resposta de erro padrão e esta não é a forma mais compreensível de tratar o erro de rotas não mapeadas. Para tal usamos o app.all que retorna uma mensagem de erro criada por nós e que é mais compreensível.
app.route("*").all((request, response) => {
  const insertedPath = request.path;

  return response
    .status(404)
    .json({ Erro: `A rota '${insertedPath}' não existe.` });
});

// * O método app.all serve para mapear uma rota que pode ser de qualquer verbo HTTP e o valor * é um wildcard, ou seja um expressão coringa que indica que indepedente da rota que chegar aqui ele vai capturar e executar a callback que por sua vez retorna uma resposta com status 404.

// ! Cuidado: Essa definição de rota generalista com app.all('*') deve ser sempre a última definição de rota da nossa API. Caso o contrário algumas requisições podem cair antes neste callback e não executar o callback para a rota específica.

app.listen(3000, () => {
  console.log("Aplicação a ser ouvida na porta 3000.");
});
