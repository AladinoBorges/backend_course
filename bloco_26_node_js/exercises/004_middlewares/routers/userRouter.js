const express = require('express');
const userRouter = express.Router();

const validateRegistrationData = require('../middlewares/registrationMiddleware.js');
const checkUserRedundancy = require('../middlewares/validateRegistrationMiddleware.js');
const loginMiddleware = require('../middlewares/loginMiddleware.js');

userRouter
  .route('/register')
  .post(validateRegistrationData, checkUserRedundancy, (_request, response) => {
    response.status(201).json({ message: 'User created.' });
  });

userRouter.route('/login').post(loginMiddleware, (request, response) => {
  const token = request.usertoken;

  response.status(200).json({ 'Your token': token });
});

module.exports = userRouter;
