//? O operador $regex fornece os "poderes" das expressões regulares (regular expressions) para seleção de strings. MongoDB utiliza expressões regulares compatíveis com Perl (PCRE), versão 8.42, e com suporte a UTF-8. Um uso muito comum para o operador $regex é fazer consultas como o LIKE do SQL.
const DATA = [
  { _id: 101, sku: "abc789", description: "First line\nSecond line" },
  { _id: 102, sku: "xyz456", description: "Many spaces before     line" },
  { _id: 103, sku: "xyz789", description: "Multiple\nline description" },
  { _id: 104, sku: "abc123", description: "Single line description." },
];

use("trybe");

db.products.insertMany(DATA);

//todo: A query abaixo seleciona todos os documentos em que o campo sku "termine" com "789".
db.products.find({ sku: { $regex: /789$/ } });

//* Podem ser especificadas opções na regex. Por exemplo, pode-se especificar a opção case-insensitive, fazendo com que o MongoDB ignore letras maiúsculas ou minúsculas. Veja o exemplo abaixo, que retorna palavras que começam com "ABC":

db.products.find({ sku: { $regex: /^ABC/i } }); //* o caractere i ao lado da expressão indica a opção case-insensitive. Dessa forma, apenas os documentos que contenham ABC no campo sku serão retornados, sem se importar se está em maiúsculo ou minúsculo.

//! Basicamente, tudo o que você pode construir com expressões regulares em outras linguagens de programação funcionará também em suas queries no MongoDB.
