const express = require('express');
const btcRouter = express.Router();

const getBTCPrice = require('../services/getBTCPrice.js');
const validateToken = require('../services/validateToken.js');

btcRouter.route('/price').get(async (request, response) => {
  const token = request.headers.authorization;

  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return response.status(401).json({ message: 'Invalid token.' });
  }

  const currentBTCPrice = await getBTCPrice();

  response.status(200).json({ BTC: currentBTCPrice });
});

module.exports = btcRouter;
