const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/AuthorController');

router.get('/', AuthorController.getAll);

router.get('/:id', AuthorController.getById);

router.post('/', AuthorController.create);

module.exports = router;
