//? A expressão $multiply multiplica dois valores numéricos. Esses valores devem ser passados num array, como nas outras expressões anteriores.
const SALES_DATA = [
  {
    _id: 1,
    item: "abc",
    price: 10,
    quantity: 2,
    date: ISODate("2014-03-01T08:00:00Z"),
  },
  {
    _id: 2,
    item: "jkl",
    price: 20,
    quantity: 1,
    date: ISODate("2014-03-01T09:00:00Z"),
  },
  {
    _id: 3,
    item: "xyz",
    price: 5,
    quantity: 10,
    date: ISODate("2014-03-15T09:00:00Z"),
  },
];

use("storage");

db.sales.deleteMany({});

db.sales.insertMany(SALES_DATA);

db.sales.aggregate([
  {
    $project: {
      date: true,
      item: true,
      total: { $multiply: ["$price", "$quantity"] },
    },
  },
]);

//? Para fixar. Utilizando o banco de dados storage:
//todo: Calcule qual o valor total em estoque de cada produto, considerando o preço de venda e a quantidade;
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      stock_value: { $multiply: ["$sale_price", "$quantity"] },
    },
  },
]);

//todo: Calcule qual será o lucro total de cada produto caso todo o estoque seja vendido.
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      tota_profit: {
        $multiply: [
          {
            $subtract: ["$sale_price", { $add: ["$purchase_price", "$taxes"] }],
          },
          "$quantity",
        ],
      },
    },
  },
]);
