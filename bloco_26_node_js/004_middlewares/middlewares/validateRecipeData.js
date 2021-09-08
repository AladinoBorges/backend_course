function validateName(request, response, next) {
  const { name } = request.body;

  if (!name || name === '') {
    return response.status(400).json({ message: 'Invalid name data!' });
  }

  next();
}

function validatePrice(request, response, next) {
  const { price } = request.body;

  if (!price || Number(price) < 0) {
    return response.status(400).json({ message: 'Invalid price data!' });
  }

  next();
}

module.exports = { validateName, validatePrice };
