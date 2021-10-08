const { ObjectId } = require('mongodb');

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
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const author = await AuthorModel.getById(id);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: `Nenhum autor com o id ${id} foi encontrado`,
      },
    };
  }

  return [formatAuthorData(id, author)];
}

// TODO : MUDAR A VALIDAÇÃO DOS DADOS PARA UM MIDDLEWARE COM JOI

function isValid({ firstName, middleName, lastName, birthday, nationality }) {
  if (!firstName && typeof firstName !== 'string') {
    return false;
  }
  if (middleName && typeof middleName !== 'string') {
    return false;
  }
  if (!lastName && typeof lastName !== 'string') {
    return false;
  }
  if (birthday && typeof birthday !== 'string') {
    return false;
  }
  if (nationality && typeof nationality !== 'string') {
    return false;
  }

  return true;
}

async function create(authorData) {
  const isValidData = isValid(authorData);

  if (!isValidData) {
    return {
      error: {
        code: 'invalidData',
        message: 'Dados inválidos',
      },
    };
  }

  const authorExists = await AuthorModel.findByName(authorData);

  if (authorExists) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Um autor já está registrado com este nome completo',
      },
    };
  }

  const author = await AuthorModel.create(authorData).then((result) =>
    formatAuthorData(result.id, result),
  );

  return [author];
}

module.exports = { getAll, getById, create };
