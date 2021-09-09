const express = require('express');
const rescue = require('express-rescue');
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

errorsRouter.get('/:fileName', [
  rescue(async (request, response, next) => {
    const { fileName } = request.params;

    const contentFromFile = await fileReader(fileName);

    response.send(contentFromFile);
  }),
  (error, _request, _response, next) => {
    if (error.code == -'ENOENT') {
      const newError = new Error(error.message);

      newError.code = 'file_not_found';
      newError.status = 404;

      return next(newError);
    }

    return next(error);
  },
]);

module.exports = errorsRouter;
