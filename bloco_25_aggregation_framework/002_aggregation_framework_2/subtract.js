//? Com a expressão subtract, podemos subtrair dois valores numéricos para retornar a diferença entre eles, ou duas datas para retornar a diferença entre elas em milissegundos. O segundo argumento sempre será subtraído do primeiro.
const SALES_DATA = [
  {
    _id: 1,
    item: "abc",
    price: 10,
    fee: 2,
    discount: 5,
    date: ISODate("2014-03-01T08:00:00Z"),
  },
  {
    _id: 2,
    item: "jkl",
    price: 20,
    fee: 1,
    discount: 2,
    date: ISODate("2014-03-01T09:00:00Z"),
  },
];

use("storage");

db.sales.deleteMany({});

db.sales.insertMany(SALES_DATA);

//todo: Em uma única operação no estágio $project , podemos montar uma expressão um pouco mais complexa, utilizando $add para calcular o total e o $subtract para aplicar um desconto no subtotal:
db.sales.aggregate([
  {
    $project: {
      item: true,
      total: {
        $subtract: [{ $add: ["$price", "$fee"] }, "$discount"],
      },
    },
  },
]);

//todo: É possível subtrair duas datas também. A operação a seguir utiliza a expressão $subtract para subtrair o valor do campo date da data corrente, utilizando a variável de sistema NOW (disponível a partir da versão 4.2 do MongoDB) e retorna a diferença em milissegundos:
db.sales.aggregate([
  {
    $project: { item: true, dateDifference: { $subtract: ["$$NOW", "$date"] } },
  },
]);

//! Alternativamente, você pode utilizar a função Date() para obter a data corrente:
db.sales.aggregate([
  {
    $project: {
      item: true,
      dateDifference: { $subtract: [new Date(), "$date"] },
    },
  },
]);

//! Também se pode utilizar milissegundos como argumento da subtração. A operação seguinte subtrai 5 minutos do campo date:
const MILLISECONDS = 5 * 60 * 1000;

db.sales.aggregate([
  {
    $project: {
      item: true,
      dateDifference: { $subtract: ["$date", MILLISECONDS] },
    },
  },
]);

//? Para fixar.
//todo: Utilizando o banco de dados storage, calcular qual o lucro total de cada produto, considerando o preço de compra, os impostos e seu valor de venda.
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      total_revenue: {
        $subtract: ["$sale_price", { $add: ["$purchase_price", "$taxes"] }],
      },
    },
  },
]);
