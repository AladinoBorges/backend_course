const fs = require("fs").promises;

const { readFile, writeFile } = fs;

const filePaths = {
  simpsons: "../mocked_databases/simpsons.js",
};

const ENCODING = "utf8";

async function fileReader(
  databasePath = filePaths.simpsons,
  encoding = ENCODING,
) {
  try {
    const fileContent = await readFile(databasePath, encoding).then((content) =>
      JSON.parse(content),
    );

    return fileContent;
  } catch ({ message }) {
    return console.error(`Erro ao ler o arquivo: ${message}`);
  }
}

async function fileWriter(databasePath = filePaths.simpsons, newContent) {
  try {
    const stringfiedContent = JSON.stringify(newContent);

    await writeFile(databasePath, stringfiedContent);
  } catch ({ message }) {
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

module.exports = { filePaths, fileReader, fileWriter };
