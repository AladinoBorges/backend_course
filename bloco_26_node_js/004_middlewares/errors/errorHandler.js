const express = require('express');
const { readFile } = require('fs').promises;

const errorsRouter = express.Router();

// * MIDDLEWARES
const authentitionMiddleware = require('../middlewares/authentitionMiddleware.js');

const ENCODING = 'utf-8';

async function fileReader(filePath, encoding = ENCODING) {
  const fileContent = await readFile(filePath, encoding);
  const stringifiedContent = fileContent.toString();

  return stringifiedContent;
}

errorsRouter.use(authentitionMiddleware);

errorsRouter.get('/:fileName', async (request, response, next) => {
  const { fileName } = request.params;

  try {
    const contentFromFile = await fileReader(fileName);

    response.send(contentFromFile);
  } catch (error) {
    next(error);
  }
});

errorsRouter.use((error, _request, response, _next) => {
  response.status(500).json({ Error: error.message });
});

module.exports = errorsRouter;
