const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * MIDDLEWARES
const { validateName, validatePrice } = require('./middlewares/validateRecipeData.js');
const authentitionMiddleware = require('./middlewares/authentitionMiddleware.js');

const RECIPES = require('./mocks/recipes.json');
const recipesDatabase = [...RECIPES];

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/open', (_request, response) => {
  response.send('Open!');
});

app.use(authentitionMiddleware);

app.get('/recipes', (_request, response) => {
  response.status(200).json(recipesDatabase);
});

app.get('/recipes/search', (request, response) => {
  const { name, maxPrice } = request.query;

  const filteredRecipes = recipesDatabase.filter(
    (recipe) => recipe.name.includes(name) && recipe.price < parseInt(maxPrice),
  );

  response.status(200).json(filteredRecipes);
});

app.get('/recipes/:id', (request, response) => {
  const { id } = request.params;

  const recipeById = recipesDatabase.find((recipe) => recipe.id === parseInt(id, 10));

  if (!recipeById) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  response.status(200).json(recipeById);
});

app.post('/recipes', validateName, validatePrice, (request, response) => {
  const { name, price, waitTime } = request.body;
  const { username } = request.user;

  recipesDatabase.push({ id: recipesDatabase.length + 1, name, price, waitTime, chef: username });

  response.status(201).json({ message: 'Recipe created successfully!' });
});

app.put('/recipes/:id', validateName, validatePrice, (request, response) => {
  const { id } = request.params;
  const { name, price, waitTime } = request.body;

  const recipeIndex = recipesDatabase.findIndex((recipe) => recipe.id === parseInt(id, 10));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  recipesDatabase[recipeIndex] = { ...recipesDatabase[recipeIndex], name, price, waitTime };

  response.status(204).end();
});

app.delete('/recipes/:id', (request, response) => {
  const { id } = request.params;

  const recipeIndex = recipesDatabase.findIndex((recipe) => recipe.id === parseInt(id, 10));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  recipesDatabase.splice(recipeIndex, 1);

  response.status(204).end();
});

app.all('*', (request, response) => {
  return response.status(404).json({ message: `The route '${request.path}' do not exist!` });
});

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
