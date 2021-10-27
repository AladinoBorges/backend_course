//? A expressão $divide, como o próprio nome sugere, divide dois valores. O primeiro argumento é o dividendo, e o segundo é o divisor.
const PLANNING_DATA = [
  { _id: 1, name: "A", hours: 80, resources: 7 },
  { _id: 2, name: "B", hours: 40, resources: 4 },
];

use("storage");

db.planning.deleteMany({});

db.planning.insertMany(PLANNING_DATA);

db.planning.aggregate([
  { $project: { name: true, workdays: { $divide: ["$hours", 8] } } },
]);

//? Para Fixar. Utilizando o banco de dados storage:
//todo: Calcule qual será o preço de venda de cada produto caso haja uma promoção de 50% de desconto.
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      promotion_price: { $divide: ["$sale_price", 2] },
    },
  },
]);
