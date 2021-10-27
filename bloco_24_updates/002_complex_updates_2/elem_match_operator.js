//? O operador $elemMatch seleciona os documentos que contêm um campo do tipo array com pelo menos um elemento que satisfaça todos os critérios de seleção especificados. Ou seja, com esse operador você pode especificar várias queries para um mesmo array.
const DATA = [
  { _id: 2, results: [82, 85, 88] },
  { _id: 3, results: [75, 88, 89] },
  {
    _id: 4,
    results: [
      { product: "abc", score: 10 },
      { product: "xyz", score: 5 },
    ],
  },
  {
    _id: 5,
    results: [
      { product: "abc", score: 8 },
      { product: "xyz", score: 7 },
    ],
  },
  {
    _id: 6,
    results: [
      { product: "abc", score: 7 },
      { product: "xyz", score: 8 },
    ],
  },
];

use("trybe");

db.scores.inserMany(DATA);

db.scores.find({ results: { $elemMatch: { $gte: 80, $lte: 85 } } }); //* a query seleciona somente os documentos em que o array results contém ao menos um elemento que seja maior ou igual a 80 e menor que 85:

//todo: A query abaixo selecionará apenas os documentos em que o array results contenha ao menos um elemento subdocumento com o campo product igual a xyz e o campo score maior ou igual a 8:
db.scores.find({
  results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } },
});

//! Não é necessário utilizar o operador $elemMatch se a query possuir apenas uma condição para "um" campo do documento embedado.
db.scores.find({ "results.product": "xyz" });

//* em vez de:
db.product.find({ results: { $elemMatch: { product: "xyz" } } });
