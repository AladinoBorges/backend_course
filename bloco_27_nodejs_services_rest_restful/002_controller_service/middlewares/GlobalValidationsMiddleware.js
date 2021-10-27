const { ObjectId } = require('mongodb');

function idValidation(request, _response, next) {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return next({ code: 'invalidData', message: 'ID inválido' });
  }

  return next();
}

module.exports = {
  idValidation,
};
