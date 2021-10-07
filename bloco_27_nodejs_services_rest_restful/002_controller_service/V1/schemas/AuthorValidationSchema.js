const Joi = require("joi");

function validateAuthorData(data) {
  const { error } = Joi.object({
    firstName: Joi.string().min(2).max(150).not().empty().required(),
    middleName: Joi.string().min(2).max(150).not().empty(),
    lastName: Joi.string().min(2).max(150).not().empty().required(),
    birthday: Joi.date().not().empty().required(),
    nationality: Joi.string().min(2).max(150).not().empty().required(),
  }).validate(data);

  if (error) {
    return error;
  } else {
    return false;
  }
}

module.exports = {
  validateAuthorData,
};
