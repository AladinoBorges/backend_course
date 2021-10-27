const fs = require("fs");

const FILE_1 = "./texts/poetry.txt";
const FILE_2 = "./texts/poem.txt";
const FILE_3 = "./texts/haiku.txt";

const FILES = [FILE_1, FILE_2, FILE_3];

function fileReader(file, rslv, rjct) {
  fs.readFile(file, (err, content) => {
    if (err) return rjct(err);

    rslv(content);
  });
}

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fileReader(fileName, resolve, reject);
  });
}

//todo: Vamos entender o que estamos fazendo aqui:
//* Recebemos, como parâmetro, o nome do arquivo que queremos ler, fileName na função readFilePromise(fileName);

//* Criamos e retornamos uma nova Promise, Promise((resolve, reject) => {};

//* Chamamos o módulo nativo do node, fs , para realizar a leitura desse arquivo, fs.readFile(fileName, (err, content) => {});

//* Dentro da callback fs.readFile(fileName, (err, content) => {}) que passamos para a função readFile , verificamos se ocorreu um erro ( if (err) ). Se sim, rejeitamos a Promise e encerramos a execução - reject(err);

//* Caso não tenha acontecido nenhum erro, resolvemos a Promise com o resultado da leitura do arquivo - resolve(content).

//! A função que passamos para a Promise só consegue retornar um resultado através da função resolve que ela recebe. Por isso, o fato de chamarmos return reject(err) não faz diferença, já que a Promise será rejeitada, e o retorno da callback passada para readFile é simplesmente ignorado. Na verdade, isso geralmente é válido para qualquer callback. Como callbacks geralmente são chamadas para lidar com resultados, seu retorno raramente importa para a função que a chamou ou que recebeu esses resultados.

//! resolve e reject são os nomes das funções que a Promise passa para a função executor. No entanto, para nós, elas são apenas parâmetros que são passados pra nossa função. Logo, não importa muito o nome que damos a elas, pois para o JavaScript isso é indiferente. De qualquer forma, chamar essas funções de qualquer outra coisa não é considerado uma boa prática, pois pode dificultar a legibilidade do código.

function promiseConsumer(file, targetFunction) {
  targetFunction(file[0])
    .then((content) => {
      console.log(
        `Arquivo de ${content.byteLength} bytes lido com sucesso. Conteúdo:\n${content}\n`,
      );

      return targetFunction(file[1]);
    })
    .then((content) => {
      console.log(
        `Arquivo de ${content.byteLength} bytes lido com sucesso. Conteúdo:\n${content}\n`,
      );

      return targetFunction(file[2]);
    })
    .then((content) => {
      console.log(
        `Arquivo de ${content.byteLength} bytes lido com sucesso. Conteúdo:\n${content}\n`,
      );
    })
    .catch(({ message }) => {
      console.error(`Erro ao ler o arquivo: ${message}`);
    });
}

//! Ao utilizar Promises, podem ser definidas mais do que uma callkack de sucesso.

promiseConsumer(FILES, readFilePromise);
