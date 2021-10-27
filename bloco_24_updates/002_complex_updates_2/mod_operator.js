//? O o operador $mod seleciona todos os documentos em que o valor do campo dividido por um divisor seja igual ao valor especificado (ou seja, executa a operação matemática módulo).
const DATA = [
  { item: "abc123", qty: 0 },
  { item: "xyz123", qty: 5 },
  { item: "ijk123", qty: 12 },
];

use("trybe");

db.inventory.insertMany(DATA);

db.inventory.find({ qty: { $mod: [4, 0] } }); //* seleciona todos os documentos da coleção em que o valor do campo qty módulo 4 seja 0.
