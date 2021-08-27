//? Promises são executadas assim que são criadas. Isso quer dizer que, no código abaixo, todos os arquivos serão lidos ao mesmo tempo e, portanto, não teremos uma forma de saber quando cada um vai terminar de ser lido. Mas e se precisarmos do resultado da leitura dos três arquivos? Entra no palco: Promise.all!

//* O Promise.all é um método da Promise que nos permite passar um array de Promises e receber, de volta, uma única Promise. Ela será resolvida com os resultados de todas as Promises, assim que todas elas forem resolvidas. Esse método também nos permite utilizar um único catch , que será chamado caso qualquer uma das Promises seja rejeitada.
const fs = require("fs").promises;

const FILES = [
  "./texts/haiku.txt",
  "./texts/poem.txt",
  "./texts/from_algoritm.txt",
];

const ENCODING = "utf8";

function main(files) {
  Promise.all([
    fs.readFile(files[0]),
    fs.readFile(files[1]),
    fs.readFile(files[2]),
  ])
    .then((files) => {
      const fileSizeSum =
        files[0].byteLength + files[1].byteLength + files[2].byteLength;

      console.log(`Lidos 3 arquivos que totalizam ${fileSizeSum} bytes.`);
    })
    .catch(({ message }) => {
      console.error(`Erro ao ler os arquivos: ${message}`);
    });
}

main(FILES, ENCODING);
