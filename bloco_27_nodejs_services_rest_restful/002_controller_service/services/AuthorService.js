const Author = require("../models/Author");

async function getAll() {
  const authors = await Author.getAll();

  return authors;
}

async function findById(id) {
  const author = await Author.findById(id);

  if (!author) {
    return {
      error: {
        code: "notFound",
        message: `Não foi possível encontrar um autor com o id ${id}`,
      },
    };
  } else {
    return author;
  }
}

async function create(firstName, middleName, lastName, birthday, nationality) {
  const authorExists = await Author.findByName(firstName, middleName, lastName);

  if (authorExists) {
    return {
      error: {
        code: "alreadyExists",
        message: "Um autor já está registrado com esse nome completo.",
      },
    };
  } else {
    const newAuthor = await Author.create(firstName, middleName, lastName, birthday, nationality);

    return newAuthor;
  }
}

module.exports = {
  getAll,
  findById,
  create,
};
