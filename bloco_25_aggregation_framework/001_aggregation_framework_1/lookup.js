//? O operador $lookup foi introduzido na versão 3.2 do MongoDB e vem evoluindo desde então. Com ele, é possível juntar documentos de outra coleção (join). Como resultado dessa junção, um elemento do tipo array é adicionado a cada documento da coleção de entrada, contendo os documentos que deram "match" na coleção com a qual se faz o "join". Existem quatro parâmetros básicos para montar um $lookup:
//* uma coleção no mesmo database para executar o join;

//* localField: o campo da coleção de onde a operação de agregação está sendo executada. Será comparado por igualdade com o campo especificado no parâmetro foreingField;

//* foreignField: o campo da coleção especificada no parâmetro from que será comparado com o campo localField por igualdade simples;

//* as: o nome do novo array que será adicionado.

//todo: join com igualdade simples. Imagine que você queria retornar em uma única query os documentos correspondentes das duas coleções mencionadas. A primeira coisa é encontrar um campo em comum entre elas. Nesse caso, seriam os campos item (coleção orders) e sku (coleção inventory). Quando cruzados na operação a seguir, um novo campo, chamado inventory_docs, será adicionado ao resultado final.
const ORDERS_DATA = [
  { _id: 1, item: "almonds", price: 12, quantity: 2 },
  { _id: 2, item: "pecans", price: 20, quantity: 1 },
  { _id: 3 },
];

const INVENTORY_DATA = [
  { _id: 1, sku: "almonds", description: "product 1", instock: 120 },
  { _id: 2, sku: "bread", description: "product 2", instock: 80 },
  { _id: 3, sku: "cashews", description: "product 3", instock: 60 },
  { _id: 4, sku: "pecans", description: "product 4", instock: 70 },
  { _id: 5, sku: null, description: "Incomplete" },
  { _id: 6 },
];

db.orders.deleteMany({});
db.inventory.deleteMany({});

db.orders.insertMany(ORDERS_DATA);
db.inventory.insertMany(INVENTORY_DATA);

db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "inventory_docs",
    },
  },
]);

//? Para fixar. Utilizando o banco de dados trybe, adicione a seguinte collection e faça os exercícios:
const CLIENTS_DATA = [
  { name: "Dave America", State: "Florida" },
  { name: "Ned Flanders", State: "Alasca" },
  { name: "Mark Zuck", State: "Texas" },
  { name: "Edna Krabappel", State: "Montana" },
  { name: "Arnold Schuz", State: "California" },
  { name: "Lisa Simpson", State: "Florida" },
  { name: "Barney Gumble", State: "Texas" },
  { name: "Homer Simpson", State: "Florida" },
];

db.clients.deleteMany({});

db.clients.insertMany(CLIENTS_DATA);

//todo: Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "from",
      as: "transactions_history",
    },
  },
]);

//todo: Selecione quatro clientes com as suas respectivas transações recebidas;
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "to",
      as: "transactions_history",
    },
  },
  { $limit: 4 },
]);

//todo: Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
  { $match: { State: "Florida" } },
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "to",
      as: "transactions_history",
    },
  },
]);
