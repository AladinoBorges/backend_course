//? Para utilizarmos um módulo interno, devemos passar o nome do pacote como parâmetro para a função require . Por exemplo, require('fs') importa o pacote fs , responsável pelo sistema de arquivos. Uma vez que importamos um pacote, podemos utilizá-lo no nosso código como uma variável.
const fs = require("fs");

function reader() {
  const result = fs.readFileSync("./texts/first_poem.txt", "utf8");

  return console.log(result);
}

reader();
