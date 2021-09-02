const express = require("express");

const app = express();

// ! Observação: Para uma aplicação back-end receber requisições de uma aplicação front-end, ou qualquer outra aplicação, é preciso instalar um módulo que libera o acesso da nossa API para outras aplicações. Para isso basta instalar um módulo chamado cors usando npm i cors e adicionar as duas seguintes linhas no seu arquivo index.js .
const cors = require("cors");
app.use(cors());

const mockedRecipesDatabase = [
  { id: 1, name: "Macarrão a Bolonhesa", price: 35.0, waitTime: 25 },
  { id: 2, name: "Lasanha", price: 40.0, waitTime: 30 },
  { id: 3, name: "Macarrão com molho branco", price: 35.0, waitTime: 25 },
];

const mockedDrinksDatabase = [
  { id: 1, name: "Refrigerante Lata", price: 5.0 },
  { id: 2, name: "Refrigerante 600ml", price: 8.0 },
  { id: 3, name: "Suco 300ml", price: 4.0 },
  { id: 4, name: "Suco 1l", price: 10.0 },
  { id: 5, name: "Cerveja Lata", price: 4.5 },
  { id: 6, name: "Água Mineral 500 ml", price: 5.0 },
];

function databaseInfoSorter(database) {
  const toPreservOriginalDatabase = [...database];

  const sorter = toPreservOriginalDatabase.sort((firstObject, secondObject) =>
    // REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_non-ascii_characters
    firstObject.name
      .toLowerCase()
      .localeCompare(secondObject.name.toLowerCase()),
  );

  return sorter;
}

function databaseInfoFinderById(database, id) {
  const toPreservOriginalDatabase = [...database];
  const stringToNumber = Number(id);

  const finder = toPreservOriginalDatabase.find(
    ({ id }) => id === stringToNumber,
  );

  return finder;
}

function searchByNameAndPrices(database, name, minPrice, maxPrice) {
  const toPreservOriginalDatabase = [...database];
  const toStringValidator = String(name).toLowerCase();
  const minPriceValidator = Number(minPrice);
  const maxPriceValidator = Number(maxPrice);

  const searcher = toPreservOriginalDatabase.filter(
    ({ name, price }) =>
      name.toLowerCase().includes(toStringValidator) &&
      price >= minPriceValidator &&
      price <= maxPriceValidator,
  );

  return searcher;
}

const recipesDatabaseSorted = databaseInfoSorter(mockedRecipesDatabase);
const drinksDatabaseSorted = databaseInfoSorter(mockedDrinksDatabase);

// todo: O endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET.

app.route("/recipes").get((_request, response) => {
  response.json(recipesDatabaseSorted);
});

app.route("/drinks").get((_request, response) => {
  response.json(drinksDatabaseSorted);
});

// ? Query String: Provavelmente você também já deve ter se deparado com URLs nesse formato /produtos?q=Geladeira&precoMaximo=2000. Para pessoas comuns é bem difícil interpretar o que são todas essas letrinhas no final da URL depois do sinal de interrogação. Essa string depois do ? é uma query string. Nesse caso está sendo passado dois parâmetros: q com o valor Geladeira e precoMaximo com o valor 2000. Geralmente o recurso de query string é usado em funcionalidades de pesquisas como quando você utiliza além da barra de pesquisa, filtros avançados para definir o preço máximo, marca e outras classificações em e-commerces. Para nosso exemplo, vamos definir uma rota /pratos/pesquisar?nome=Macarrão que permita, inicialmente, buscar uma lista de receitas filtrando pelo nome.
app.route("/recipes/search").get((request, response) => {
  const { name, minPrice, maxPrice } = request.query;

  const filteredRecipes = searchByNameAndPrices(
    recipesDatabaseSorted,
    name,
    minPrice,
    maxPrice,
  );

  if (!filteredRecipes.length) {
    return response.status(404).json({
      404: "Nenhuma receita encontrada.",
      "termos de busca": {
        nome: name,
        "Preço mínimo": `${!minPrice ? "undefined" : minPrice}`,
        "Preço máximo": `${!maxPrice ? "undefined" : maxPrice}`,
      },
    });
  } else {
    response.status(200).json(filteredRecipes);
  }
});

app.route("/drinks/search");

// ? Parâmetros de rota: o caso em que precisamos acessar objetos específicos, o express tem alguns recursos para que conseguimos passar informações além da rota que desejamos buscar. Vamos começar falando de parâmetro de rotas. Você provavelmente já se deparou com URLs no seguinte formato http://<site>/noticias/489 ou http://<site>/pedidos/713. Esses valores que são passados nas rotas que geralmente devolvem uma página seguindo o mesmo template mas com um conteúdo diferente é implementado graças ao parâmetro de rota. Imagina se para cada nova notícia ou pedido você tivesse que criar uma rota específica exatamente com /noticias/489 ou /pedidos/713 ? o trabalho das pessoas desenvolvedoras seria passar o dia inteiro escrevendo rotas. Para facilitar esse processo, utilizamos parâmetros de rota, que no Express, podem ser definidos da seguinte forma: /<rota>/<:parametro> onde :parametro vai servir para qualquer valor que vier na URL com aquele prefixo específico.
app.route("/recipes/:id").get((request, response) => {
  const { id } = request.params;

  const recipe = databaseInfoFinderById(mockedRecipesDatabase, id);

  if (!recipe) {
    return response.status(404).json({ Erro: "Receita não encontrada" });
  } else {
    response.status(200).json(recipe);
  }
});

app.route("/drinks/:id").get((request, response) => {
  const { id } = request.params;

  const drink = databaseInfoFinderById(mockedDrinksDatabase, id);

  if (!drink) {
    return response.status(404).json({ Erro: "Bebida não encontrada." });
  } else {
    response.status(200).json(drink);
  }
});

// ! Agora, deixamos de usar o método .send para usar o método .json. O método .send é um método que consegue retornar a resposta de uma requisição de uma forma genérica, adaptando o tipo do retorno ao que vai ser retornado. Mas para deixar mais evidente que o que vamos devolver é um JSON usamos o método .json.

// ! Observação: Quando houver rotas com um mesmo radical e uma destas utilizar parâmetro de rota, as rotas mais específicas devem ser definidas sempre antes. Isso porque o Express ao resolver uma rota vai olhando rota por rota qual corresponde a URL que chegou. Se colocamos a rota /recipes/search depois da rota /recipes/:id, o Express vai entender que a palavra search como um id e vai chamar a callback da rota /recipes/:id.

app.listen(3000, () => {
  console.log("Aplicação a ser ouvida na porta 3000.");
});
