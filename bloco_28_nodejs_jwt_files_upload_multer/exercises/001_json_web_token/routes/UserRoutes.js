const router = require('express').Router();

const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/authentication');

router.get('/me', AuthMiddleware.byToken, UserController.getByUsername);
router.get('/', AuthMiddleware.byToken, UserController.topSecret);

module.exports = router;
