// todo: utilizar o arquivo simpsons.js:
const { readFile, writeFile } = require("fs").promises;

const ORIGINAL_DATABASE = require("./simpsons.json");
const CLONE_DATABASE = require("./simpsonFamily.json");

const FILE_PATH = "./simpsons.json";
const NEW_FILE_PATH = "./simpsonFamily.json";

const ENCODING = "utf8";

const IDS = [10, 6];
const IDS_TO_FILTER = [1, 2, 3, 4];
const NELSON_ID = 8;

const NELSON = { id: "8", name: "Nelson Muntz" };
const MAGGIE = { id: "5", name: "Maggie Simpson" };

function arrayNumbersToString(array) {
  const result = array.map((id) => String(id));

  return result;
}

// * 1. uma função que lê e imprime todos os dados do arquivo no formato id - Nome. Por exemplo: 1 - Homer Simpson.
async function printPersonageInfo(database) {
  try {
    const formattedResults = await database
      .map(({ id, name }) => `\n${id} - ${name}.`)
      .join("");
    console.log(`\nSucesso. Resultados:\n${formattedResults}`);
  } catch ({ message }) {
    console.error(`Erro: {{message}}`);
  }
}

// * 2. Crie uma função que receba o id de uma personagem como parâmetro e retorne uma Promise que é resolvida com os dados da personagem que possui o id informado. Caso não haja uma personagem com o id informado, rejeite a Promise com o motivo "id não encontrado".
async function getPersonageById(id, database) {
  const convertNumberToString = String(id);
  const findPersonage = await database.find(
    (personage) => personage.id === convertNumberToString,
  );

  if (!findPersonage) {
    throw new Error(`\nPersonagem com o id ${id} não foi encontrado.\n`);
  } else {
    const resultObjectToString = JSON.stringify(findPersonage);

    return console.log(resultObjectToString);
  }
}

// * 3. Crie uma função que altere o arquivo simpsons.json retirando os personagens com id 10 e 6.
async function fileWriter(filePath, fileData) {
  await writeFile(filePath, fileData);
}

async function removePersonagesFromFile(filePath, encoding, ids) {
  const fileContent = await readFile(filePath, encoding).then((content) =>
    JSON.parse(content),
  );

  const turnIdsIntoStrings = arrayNumbersToString(ids);

  const newArray = fileContent.filter(
    ({ id }) => id !== turnIdsIntoStrings[0] && id !== turnIdsIntoStrings[1],
  );

  const arrayToString = JSON.stringify(newArray);

  fileWriter(filePath, arrayToString);
}

// * 4. Crie uma função que leia o arquivo simpsons.json e crie um novo arquivo, chamado simpsonFamily.json, contendo as personagens com id de 1 a 4.
async function newFileCreator(newFilePath, idsToFilter, fileToCopy, encoding) {
  const turnIdsIntoStrings = arrayNumbersToString(idsToFilter);

  const oldFileContent = await readFile(fileToCopy, encoding).then((content) =>
    JSON.parse(content),
  );

  const newFileContent = oldFileContent.filter(({ id }) =>
    turnIdsIntoStrings.includes(id),
  );

  const stringifyContent = JSON.stringify(newFileContent);

  fileWriter(newFilePath, stringifyContent);
}

// * 5. Crie uma função que adicione ao arquivo simpsonFamily.json o personagem Nelson Muntz.
async function insertPersonageIntoFile(clonedDatabase, newInfo, filePath) {
  try {
    const fileToCopy = await clonedDatabase.map((item) => item);
    fileToCopy.push(newInfo);

    const stringifyContent = JSON.stringify(fileToCopy);

    fileWriter(filePath, stringifyContent);
  } catch ({ message }) {
    console.error(`Erro: {{message}}`);
  }
}

// * 6. Crie uma função que substitua o personagem Nelson Muntz pela personagem Maggie Simpson no arquivo simpsonFamily.json.
async function replaceInfoOnFile(targetFile, targetPath, idToReplace, newInfo) {
  const idToString = String(idToReplace);

  try {
    const readedData = await targetFile.filter(
      (personage) => personage.id !== idToString,
    );
    readedData.push(newInfo);

    const stringifyContent = JSON.stringify(readedData);

    fileWriter(targetPath, stringifyContent);
  } catch ({ message }) {
    console.error(`Erro: {{message}}`);
  }
}

replaceInfoOnFile(CLONE_DATABASE, NEW_FILE_PATH, NELSON_ID, MAGGIE);
