const Author = require("../models/Author");

async function getAll() {
  const authors = await Author.getAll();

  return authors;
}

async function findById(id) {
  const author = await Author.findById(id);

  if (!author) {
    const newError = {
      error: {
        code: "notFound",
        message: `Não foi possível encontrar um autor com o id ${id}`,
      },
    };

    return newError;
  } else {
    const data = { author };
    return data;
  }
}

async function create(firstName, middleName, lastName, birthday, nationality) {
  const authorExists = await Author.findByName(firstName, middleName, lastName);

  if (authorExists) {
    const newError = {
      error: {
        code: "alreadyExists",
        message: "Um autor já está registrado com esse nome completo.",
      },
    };

    return newError;
  } else {
    const newAuthor = await Author.create(firstName, middleName, lastName, birthday, nationality);
    const data = { newAuthor };

    return data;
  }
}

module.exports = {
  getAll,
  findById,
  create,
};
