const express = require('express');
const router = express.Router();

const UserModel = require('../models/UserModel');
const { idValidation, dataValidation } = require('../middlewares/ValidationsMiddleware');

router.get('/', async (_request, response) => {
  const users = await UserModel.getAll();

  return response.status(200).json(users);
});

router.get('/:id', idValidation, async (request, response, next) => {
  const { id } = request.params;

  const user = await UserModel.getById(id);

  if (!user) {
    return next({ code: 'notFound', message: 'Usuário não encontrado' });
  }

  return response.status(200).json(user);
});

router.post('/', dataValidation, async (request, response) => {
  const { body } = request;

  const newUser = await UserModel.create(body);

  return response.status(201).json(newUser);
});

router.put('/:id', idValidation, dataValidation, async (request, response) => {
  const { id } = request.params;

  return response.status().json();
});

router.delete('/:id', idValidation, async (request, response) => {
  const { id } = request.params;

  return response.status().json();
});

module.exports = router;
