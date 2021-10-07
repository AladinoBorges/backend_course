const Joi = require("joi");

function validateAuthorId(data) {
  const { error } = Joi.object({
    authorId: Joi.number().not().empty(),
  }).validate(data);

  if (error) {
    return error;
  } else {
    return false;
  }
}

function validateBookData(data) {
  const { error } = Joi.object({
    title: Joi.string().min(1).max(200).not().empty().required(),
    authorId: Joi.number().not().empty().max(100).required(),
  }).validate(data);

  if (error) {
    return error;
  } else {
    return false;
  }
}

module.exports = { validateAuthorId, validateBookData };
