const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router.get('/', BookController.getAll);

router.get('/:id', BookController.getById);

router.post('/', BookController.create);

module.exports = router;
