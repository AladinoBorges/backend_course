const router = require('express').Router();

const LoginController = require('../controllers/LoginController');
const validate = require('../middlewares/validationsMiddleware');

router.post('/', validate.loginData, LoginController.getByUsername);

module.exports = router;
