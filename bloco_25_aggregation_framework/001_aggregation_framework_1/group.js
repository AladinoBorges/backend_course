//? Este é provavelmente o operador que você mais utilizará nas operações de agregação. Com ele é possível agrupar valores de diversas formas, desde um "distinct" simples até cálculos mais elaborados com a ajuda de outros operadores.

//* O principal parâmetro do $group é o _id (que não tem nada a ver com o campo _id das coleções). Neste caso, ele é responsável por conter o campo ou os campos que serão utilizados no agrupamento.

//todo: Operador de acumulação - Para fazer operações sobre os campos de documentos agrupados usamos operadores de acumulação. Os mais utilizados são:
//* $addToSet : retorna um array com os valores únicos da expressão para cada grupo;
//* $avg : retorna a média de valores numéricos. Valores não numéricos são ignorados;
//* $first : retorna um valor do primeiro documento de cada grupo;
//* $last : retorna um valor do último documento de cada grupo;
//* $max : retorna o maior valor de cada grupo;
//* $sum : retorna a soma de valores numéricos. Valores não numéricos são ignorados.
const DATA = [
  {
    _id: 1,
    item: "Código Limpo",
    price: NumberDecimal("10"),
    quantity: NumberInt("2"),
    date: ISODate("2014-03-01T08:00:00Z"),
  },
  {
    _id: 2,
    item: "O Homem e Seus Símbolos",
    price: NumberDecimal("20"),
    quantity: NumberInt("1"),
    date: ISODate("2014-03-01T09:00:00Z"),
  },
  {
    _id: 3,
    item: "Comunicação Não-Violenta",
    price: NumberDecimal("5"),
    quantity: NumberInt("10"),
    date: ISODate("2014-03-15T09:00:00Z"),
  },
  {
    _id: 4,
    item: "Comunicação Não-Violenta",
    price: NumberDecimal("5"),
    quantity: NumberInt("20"),
    date: ISODate("2014-04-04T11:21:39.736Z"),
  },
  {
    _id: 5,
    item: "Código Limpo",
    price: NumberDecimal("10"),
    quantity: NumberInt("10"),
    date: ISODate("2014-04-04T21:23:13.331Z"),
  },
  {
    _id: 6,
    item: "A Coragem de Ser Imperfeito",
    price: NumberDecimal("7.5"),
    quantity: NumberInt("5"),
    date: ISODate("2015-06-04T05:08:13Z"),
  },
  {
    _id: 7,
    item: "A Coragem de Ser Imperfeito",
    price: NumberDecimal("7.5"),
    quantity: NumberInt("10"),
    date: ISODate("2015-09-10T08:43:00Z"),
  },
  {
    _id: 8,
    item: "Código Limpo",
    price: NumberDecimal("10"),
    quantity: NumberInt("5"),
    date: ISODate("2016-02-06T20:20:13Z"),
  },
];

db.sales_two.deleteMany({});

db.sales_two.insertMany(DATA);

db.sales_two.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }]); //* O _id está setado como null, porque nesse caso queremos todos os documentos.

//todo: Retornar valores distintos.
db.sales_two.aggregate([{ $group: { _id: "$item", count: { $sum: 1 } } }]);

//todo: Soma de valores.
db.sales_two.aggregate([
  {
    $group: {
      _id: "$item",
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
]);

//todo: Having, combinar os estágios no aggregate - ambém é possível realizar operações equivalentes ao HAVING do SQL , que nada mais é que um filtro depois de um agrupamento. Por exemplo, se você quiser manter o agrupamento anterior, mas saber apenas as vendas que possuem valores maiores do que 100 , é só adicionar mais um estágio no pipeline.
db.sales_two.aggregate([
  {
    $group: {
      _id: "$item",
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
  { $match: { totalSaleAmount: { $gte: 100 } } },
]);

//todo: Agrupar por null. É possível executar operações matemáticas em todos os documentos de uma coleção. Basta passar null no _id e seguir com os operadores de acumulação. No exemplo a seguir, a operação de agregação retornará um documento com o valor total da venda, a quantidade média de itens vendidos e o total de vendas.
db.sales_two.aggregate([
  {
    $group: {
      _id: null,
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
      averageQuantity: { $avg: "$quantity" },
      count: { $sum: 1 },
    },
  },
]);

//? PAra fixar, utilizando o banco de dados trye e a coleção transactions:
//todo: Selecione todos os bancos, ou seja, valores do campo bank:
db.transactions.aggregate([{ $group: { _id: "$bank" } }]);

//todo: Selecione o valor total das transações em cada banco e quantas são:
db.transactions.aggregate([
  {
    $group: {
      _id: "$bank",
      totalTransactions: { $sum: "$value" },
      count: { $sum: 1 },
    },
  },
]);

//todo: Selecione o valor total de transações:
db.transactions.aggregate([
  { $group: { _id: null, totalTransactions: { $sum: "$value" } } },
]);

//todo: Selecione os bancos que têm o valor total de transações maior que 1000.
db.transactions.aggregate([
  { $group: { _id: "$bank", totalTransactions: { $sum: "$value" } } },
  { $match: { totalTransactions: { $gt: 1000 } } },
]);
