const express = require('express');

const router = express.Router();

const RECIPES = require('../mocks/recipes.json');
const recipesDatabase = [...RECIPES];

// * MIDDLEWARES
const authentitionMiddleware = require('../middlewares/authentitionMiddleware.js');
const { validateName, validatePrice } = require('../middlewares/validateRecipeData.js');

router.use(authentitionMiddleware);

router.get('/', (_request, response) => {
  response.status(200).json(recipesDatabase);
});

router.get('/search', (request, response) => {
  const { name, maxPrice } = request.query;

  const filteredRecipes = recipesDatabase.filter(
    (recipe) => recipe.name.includes(name) && recipe.price < parseInt(maxPrice),
  );

  response.status(200).json(filteredRecipes);
});

router.get('/:id', (request, response) => {
  const { id } = request.params;

  const recipeById = recipesDatabase.find((recipe) => recipe.id === parseInt(id, 10));

  if (!recipeById) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  response.status(200).json(recipeById);
});

router.post('/', validateName, validatePrice, (request, response) => {
  const { name, price, waitTime } = request.body;
  const { username } = request.user;

  recipesDatabase.push({ id: recipesDatabase.length + 1, name, price, waitTime, chef: username });

  response.status(201).json({ message: 'Recipe created successfully!' });
});

router.put('/:id', validateName, validatePrice, (request, response) => {
  const { id } = request.params;
  const { name, price, waitTime } = request.body;

  const recipeIndex = recipesDatabase.findIndex((recipe) => recipe.id === parseInt(id, 10));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  recipesDatabase[recipeIndex] = { ...recipesDatabase[recipeIndex], name, price, waitTime };

  response.status(204).end();
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;

  const recipeIndex = recipesDatabase.findIndex((recipe) => recipe.id === parseInt(id, 10));

  if (recipeIndex === -1) {
    return response.status(404).json({ message: 'Recipe not found!' });
  }

  recipesDatabase.splice(recipeIndex, 1);

  response.status(204).end();
});

module.exports = router;
