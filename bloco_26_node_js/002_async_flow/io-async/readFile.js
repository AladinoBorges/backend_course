//? O método fornecido pelo módulo fs para leitura assíncrona de arquivos é o fs.readFile. Na versão padrão do fs, a função readFile aceita um callback, que é chamado quando a leitura do arquivo termina.
const fs = require("fs").promises;

const FILE = "../texts/lyrics_ocris.txt";
const ENCODING = "utf8";

function asyncReader(file, encoding) {
  // fs.readFile(file, encoding, (err, data) => {
  //   if (err) {
  //     console.error(`Não foi possível ler o arquivo ${file}.\nErro: ${err}`);
  //     process.exit(1);
  //   } else {
  //     console.log(`Conteúdo do arquivo:\n${data}`);
  //   }
  // });

  fs.readFile(file, encoding)
    .then((data) => {
      console.log(`Conteúdo do arquivo:\n${data}`);
    })
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${file}.\nErro: ${err}`);
      process.exit(1);
    });
}

//todo: O método acima também é responsável por ler arquivos e trazer seu conteúdo para dentro do Node.js. Ele recebe três parâmetros:
//* O nome do arquivo;

//* Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo;

//* Uma callback que permite receber e manipular os dados lidos do arquivo.

asyncReader(FILE, ENCODING);

//! Nota: É importante lembrar que esses dados ficam armazenados em memória. Ou seja, caso você tenha um arquivo de 1GB de texto, você trará 1GB de dados para a memória RAM. No entanto, essa não é a única forma do método readFile. O módulo fs possui um segundo modelo de API que, em vez de trabalhar com callbacks, retorna Promises, o que torna seu uso muito mais recomendável. Para utilizar a interface de Promises do fs, precisamos alterar a importação do módulo fs, importando ('fs').promises.
