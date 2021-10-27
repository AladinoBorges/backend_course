const express = require('express');
const router = express.Router();

router.all('*', function (_request, _response, next) {
  return next({
    code: 'notFound',
    message: 'Sou a página mais famosa do mundo: Erro 404, nada para ver por aqui',
  });
});

module.exports = router;
