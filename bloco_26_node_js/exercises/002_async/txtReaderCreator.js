// todo: Crie uma função que lê e escreve vários arquivos ao mesmo tempo.
const { readFile, writeFile } = require("fs").promises;

const LAST_FILE_PATH = "./fileAll.txt";

const ARRAY_OF_STRING = ["Finalmente", "estou", "usando", "Promise.all", "!!!"];
const FILES_NAMES = [];

const ENCODING = "utf8";

// * 1. Utilize o Promise.all para manipular vários arquivos ao mesmo tempo.

// * 2. Dado o seguinte array de strings: ['Finalmente', 'estou', 'usando', 'Promise.all', '!!!'] Faça com que sua função crie um arquivo contendo cada string, sendo o nome de cada arquivo igual a file<index + 1>.txt. Por exemplo, para a string "Finalmente", o nome do arquivo é file1.txt.

// * 3. Programe sua função para que ela faça a leitura de todos os arquivos criados no item anterior, armazene essa informação e escreva em um arquivo chamado fileAll.txt.

// * 4. O conteúdo do arquivo fileAll.txt deverá ser Finalmente estou usando Promise.all !!!.

async function txtFileReaderAndWriter(
  files,
  arrayToPushInfo,
  encoding,
  finalFilePath,
) {
  // * 2º ponto:
  const newFiles = files.map((text, index) => {
    const fileName = `./file${index + 1}.txt`;

    writeFile(fileName, text);
    arrayToPushInfo.push(fileName);
  });

  //* 1º ponto:
  await Promise.all(newFiles);

  //* 3ª ponto:
  const readContentFromAllFiles = await Promise.all(
    arrayToPushInfo.map((fileName) => readFile(fileName, encoding)),
  );

  const formatedContent = readContentFromAllFiles.join(" ");

  await writeFile(finalFilePath, formatedContent);
}

txtFileReaderAndWriter(ARRAY_OF_STRING, FILES_NAMES, ENCODING, LAST_FILE_PATH);
