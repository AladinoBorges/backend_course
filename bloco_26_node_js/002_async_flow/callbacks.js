//? Basicamente, toda vez que precisarmos que algo seja processado em segundo plano, devemos registrar uma callback. Ela será executada quando a operação que solicitamos for concluída. Podemos pensar em callbacks como sendo uma forma de dizermos pro runtime JavaScript um "vê lá e me avisa".
const fs = require("fs");
const contentFilePath = "./texts/poetry.txt";

function load() {
  const fromFile = fs.readFile(contentFilePath, (error, content) => {
    if (error) {
      console.error(`Erro ao ler o arquivo: ${error.message}`);
      return; //* Funciona como o break do switch case.
    }

    console.log(
      `Arquivo lido com sucesso. Conteúdo:\n\n${content.toString("utf8")}`,
    );
  });

  return fromFile;
}

load();

//* No exemplo acima, passamos uma função para readFile, à qual damos o nome de callback. Essa função de callback recebe dois parâmetros: o primeiro, que chamamos de err, é um erro que pode ter ocorrido durante a leitura do arquivo. Caso nenhum erro tenha ocorrido, esse parâmetro será undefined. O segundo parâmetro é, nesse caso, o conteúdo do arquivo, em forma de uma sequência de bytes, que chamamos de content. Caso ocorra um erro na leitura do arquivo, esse parâmetro será undefined.

//! Esse formato de callback que recebe dois parâmetros, erro e resultado, não foi utilizado por acaso. Callbacks desse tipo são chamadas de node-style callbacks e são, por convenção, a melhor maneira de se estruturar uma callback. Toda API de módulos nativos do Node.js utiliza esse mesmo formato de callbacks.
