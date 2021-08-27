//? importante saber que não precisamos ler arquivos "em segundo plano". Podemos fazer isso de forma síncrona, ou seja: parar a execução de todo o programa até que um arquivo seja lido. Os métodos assíncronos não esperam o comando atual terminar para iniciar o próximo. Se quisermos ler um arquivo de maneira assíncrona, o Javascript não vai esperar o arquivo inteiro ser lido para só então dar continuidade ao script. Se quisermos esse comportamento, precisamos de um método síncrono. O método disponibilizado pelo módulo fs para leitura síncrona de arquivos é o fs.readFileSync.
const fs = require("fs");

const FILE = "lyrics_ocris.txt";

try {
  const data = fs.readFileSync(FILE, "utf8");
  console.log(data);
} catch (err) {
  console.error(`Erro ao ler o arquivo: ${err.path}.\n`);
  console.log(err);
}

//* Esse método é responsável por ler arquivos e trazer seu conteúdo para dentro do Node.js. Por ser síncrono, ele espera a leitura do arquivo terminar para, só então, atribuir o resultado à constante data. O método readFileSync recebe dois parâmetros:
//* O nome do arquivo;
//* Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo.
