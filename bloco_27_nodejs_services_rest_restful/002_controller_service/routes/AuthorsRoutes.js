const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/AuthorController');
const GlobalValidations = require('../middlewares/GlobalValidationsMiddleware');
const AuthorValidations = require('../middlewares/AuthorValidationsMiddleware');

router.get('/', AuthorController.getAll);

router.get('/:id', GlobalValidations.idValidation, AuthorController.getById);

router.post(
  '/',
  AuthorValidations.submitedData,
  AuthorValidations.checkIfExistsByFullname,
  AuthorController.create,
);

module.exports = router;
