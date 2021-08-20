//? Com a expressão $add , é possível somar valores numéricos ou datas. Se um dos argumentos for do tipo date , o outro argumento será tratado como milissegundos e adicionado à data.
const PRODUCTS_DATA = [
  {
    name: "Ball",
    purchase_price: 7.6,
    taxes: 1.9,
    sale_price: 12.5,
    quantity: 5,
  },
  {
    name: "Baseball bat",
    purchase_price: 18.5,
    taxes: 5.3,
    sale_price: 39.9,
    quantity: 12,
  },
  {
    name: "Sneakers",
    purchase_price: 10.4,
    taxes: 1.5,
    sale_price: 14.9,
    quantity: 3,
  },
  {
    name: "Gloves",
    purchase_price: 2.85,
    taxes: 0.9,
    sale_price: 5.7,
    quantity: 34,
  },
  {
    name: "Jacket",
    purchase_price: 28.9,
    taxes: 10.8,
    sale_price: 59.9,
    quantity: 20,
  },
  {
    name: "Mousepad",
    purchase_price: 16.6,
    taxes: 3.4,
    sale_price: 29.9,
    quantity: 8,
  },
  {
    name: "Monitor",
    purchase_price: 119.9,
    taxes: 39.2,
    sale_price: 240.6,
    quantity: 11,
  },
];

const SALES_DATA = [
  {
    _id: 1,
    item: "abc",
    price: 10,
    fee: 2,
    date: ISODate("2014-03-01T08:00:00Z"),
  },
  {
    _id: 2,
    item: "jkl",
    price: 20,
    fee: 1,
    date: ISODate("2014-03-01T09:00:00Z"),
  },
  {
    _id: 3,
    item: "xyz",
    price: 5,
    fee: 0,
    date: ISODate("2014-03-15T09:00:00Z"),
  },
];

db.products.deleteMany({});
db.sales.deleteMany({});

db.products.insertMany(PRODUCTS_DATA);
db.sales.insertMany(SALES_DATA);

//todo: Utilizando a expressão $add no estágio $project, você pode criar um novo campo com o valor total somando os campos price e fee:
db.sales.aggregate([
  { $project: { item: 1, total: { $add: ["$price", "$fee"] } } },
]);

//! Para valores do tipo date, um dos argumentos sempre será tratado como milissegundos. Imagine que você queira adicionar 3 dias ao valor do campo date. Você consegue fazer de duas maneiras. A primeira é passar em um dos argumentos o número equivalente a 3 dias em milissegundos (2,592e+8). A segunda é criar uma expressão que devolva esse número:
//todo: Modelo 1:
db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", 2.592e8] } } },
]);

//todo: Modelo 2:
const MILLISECONDS = 3 * 24 * 60 * 60000;

db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", MILLISECONDS] } } },
]);

//? Para fixar.
//todo: Utilizando o banco de dados storage,  fazer o cálculo do custo total de cada produto, considerando o preço de compra e os impostos.
db.products.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      total_cost: { $add: ["$purchase_price", "$taxes"] },
    },
  },
]);
