const AuthorModel = require('../models/mongo/AuthorModel');

function formatAuthorData(id, { firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');

  return { id, firstName, middleName, lastName, fullName };
}

async function getAll() {
  const authors = await AuthorModel.getAll().then((result) =>
    result.map((author) => formatAuthorData(author._id, author)),
  );

  return authors;
}

async function getById(id) {
  const author = await AuthorModel.getById(id);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: `Nenhum autor com o id '${id}' foi encontrado`,
      },
    };
  }

  return [formatAuthorData(id, author)];
}

async function create(authorData) {
  const author = await AuthorModel.create(authorData).then((result) =>
    formatAuthorData(result.id, result),
  );

  return [author];
}

module.exports = { getAll, getById, create };
