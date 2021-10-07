const { validateAuthorData } = require("../schemas/AuthorValidationSchema");
const { validateBookData } = require("../schemas/BookValidationSchema");

function createAuthorValidation(request, _response, next) {
  const { ValidationError } = validateAuthorData(request.body);

  if (ValidationError) {
    return next(ValidationError);
  } else {
    return next();
  }
}

function createBookValidation(request, _response, next) {
  const { ValidationError } = validateBookData(request.body);

  if (ValidationError) {
    return next(ValidationError);
  } else {
    return next();
  }
}

module.exports = { createAuthorValidation, createBookValidation };
