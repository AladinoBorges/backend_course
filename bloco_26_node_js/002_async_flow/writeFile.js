//? Escrever dados em arquivos é um processo bem parecido com a leitura de dados! Assim como o módulo ('fs').promises disponibiliza o método readFile, há também o método writeFile.
const fs = require("fs").promises;

const FILE = "./texts/from_algoritm.txt";
const TEXT = "Este texto foi escrito diretamente no algoritmo.";

function asyncWriteOnFile(filename, text) {
  fs.writeFile(filename, text)
    .then(() => {
      console.log("Arquivo escrito com sucesso!");
    })
    .catch(({ message }) => {
      console.error(`Erro ao escrever o arquivo: ${message}`);
    });
}

asyncWriteOnFile(FILE, TEXT);
