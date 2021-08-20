//? A expressão $abs retorna o valor absoluto de um número. Essa expressão é muito útil para encontrar a diferença entre dois valores.
const RATINGS_DATE = [
  { _id: 1, start: 5, end: 8 },
  { _id: 2, start: 4, end: 4 },
  { _id: 3, start: 9, end: 7 },
  { _id: 4, start: 6, end: 7 },
];

use("storage");

db.ratings.deleteMany({});

db.ratings.insertMany(RATINGS_DATE);

db.ratings.aggregate([
  { $project: { delta: { $abs: { $subtract: ["$start", "$end"] } } } },
]); //* Aplicando a expressão $abs combinada com a expressão $subtract no estágio $project , podemos retornar a diferença entre os valores dos campos start e end.

//? Para fixar.
//todo: Utilizando o banco de dados storage, calcular o valor absoluto do lucro total de cada produto.
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      absolute_profit: {
        $abs: {
          $subtract: ["$sale_price", { $add: ["$purchase_price", "$taxes"] }],
        },
      },
    },
  },
]);
