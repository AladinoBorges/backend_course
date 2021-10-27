const { readFile, writeFile } = require('fs').promises;

const ENCODING = 'utf8';

async function fileReader(filePath, encoding = ENCODING) {
  try {
    const fileContent = await readFile(filePath, encoding);
    const result = JSON.parse(fileContent);

    return result;
  } catch (error) {
    return error;
  }
}

async function fileWriter(filePath, content) {
  try {
    const oldFileContent = await fileReader(filePath);
    oldFileContent.push(content);

    const stringifyContent = JSON.stringify(oldFileContent);

    await writeFile(filePath, stringifyContent);

    return console.log('File writed with success!');
  } catch (error) {
    return error;
  }
}

module.exports = { fileReader, fileWriter };
