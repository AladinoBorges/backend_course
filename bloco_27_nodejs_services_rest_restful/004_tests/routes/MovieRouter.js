const router = require('express').Router();

const MovieController = require('../controllers/MovieController');

router.post('/', MovieController.create);

module.exports = router;
