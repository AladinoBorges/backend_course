module.exports = (_request, response, _next) => {
  return response.status(200).send('Pong!');
};
