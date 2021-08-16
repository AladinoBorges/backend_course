//? O operador $size seleciona documentos em que um array contenha um número de elementos especificado.
const DATA = [
  { _id: 1, tags: ["red", "green"] },
  { _id: 2, tags: ["apple", "lime"] },
  { _id: 3, tags: "fruit" },
  { _id: 4, tags: ["orange", "lemon", "grapefruit"] },
];

use("trybe");

db.fruits.insertMany(DATA);

db.fruits.find({ tags: { $size: 2 } }); //* Ao executar a query, apenas os documentos com o _id igual 1 e 2 serão retornados, pois os seus campos 'tags' são arrays e contêm exatamente 2 elementos.

//! É importante saber que o operador $size aceita apenas valores númericos, não sendo possível, por exemplo, trazer arrays com comprimento maior do que 2 ($gt: 2). Se você precisar selecionar documentos com base em valores diferentes, a solução é criar um campo que se incremente quando elementos forem adicionados ao array.
