function validateTeamsDataMiddleware(request, response, next) {
  const { name, initials, country } = request.body;

  if (!name || !initials || !country) {
    return response.status(400).json({ message: 'Invalid data.' });
  }

  const isValidName = name.length > 5;
  const isValidInitials = initials.length > 0 && initials.length <= 3;
  const isValidCountry = country.length > 3;

  const isValidData = isValidName && isValidInitials && isValidCountry;

  if (!isValidData) {
    return response.status(400).json({ message: 'Invalid data.' });
  } else {
    next();
  }
}

module.exports = validateTeamsDataMiddleware;
