//? Pode-se incrementar ainda mais adicionando a ele expressões mais elaboradas e aplicando vários operadores que você já conhece. Também pode referenciar campos dos documentos de entrada para serem utilizados nas condições e até mesmo montar um pipeline dentro dele. Para isso, existem mais dois parâmetros, ambos opcionais:
//* let: define as variáveis que serão utilizadas no estágio pipeline dentro do $lookup. É necessário porque o estágio pipeline não consegue acessar diretamente os campos dos documentos de entrada, então esses campos precisam ser definidos previamente e transformados em variáveis;

//* pipeline: define as condições ou o pipeline que será executado na coleção de junção. Se você quiser todos os documentos da coleção de junção, é só especificá-lo como vazio ([]).
const ORDERS_DATA = [
  { _id: 1, item: "almonds", price: 12, ordered: 2 },
  { _id: 2, item: "pecans", price: 20, ordered: 1 },
  { _id: 3, item: "cookies", price: 10, ordered: 60 },
];

const WAREHOUSES_DATA = [
  { _id: 1, stock_item: "almonds", warehouse: "A", instock: 120 },
  { _id: 2, stock_item: "pecans", warehouse: "A", instock: 80 },
  { _id: 3, stock_item: "almonds", warehouse: "B", instock: 60 },
  { _id: 4, stock_item: "cookies", warehouse: "B", instock: 40 },
  { _id: 5, stock_item: "cookies", warehouse: "A", instock: 80 },
];

db.orders.deleteMany({});
db.warehouse.deleteMany({});

db.orders.insertMany(ORDERS_DATA);
db.warehouse.insertMany(WAREHOUSES_DATA);

//todo: A operação a seguir junta todos os documentos da coleção orders com a coleção warehouse através do campo item se a quantidade em estoque (instock) for suficiente para cobrir a quantidade vendida (ordered). Os documentos que dão match são colocados no campo stockdata.
db.orders.aggregate([
  {
    $lookup: {
      from: "warehouse",
      let: { order_item: "$item", order_qty: "$ordered" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$stock_item", "$$order_item"] },
                { $gte: ["$instock", "$$order_qty"] },
              ],
            },
          },
        },
        { $project: { stock_item: 0, _id: 0 } },
      ],
      as: "stockdata",
    },
  },
]); //* Note que, dentro do estágio pipeline, temos um operador $match que utiliza uma expressão ($expr). Esta, por sua vez, utiliza o operador $and. Dentro do $and, são utilizados operadores de igualdade ($eq) e de comparação ($gte). O símbolo $ é utilizado para se referir aos campos da coleção warehouse (a coleção de junção), enquanto $$ se refere às variáveis definidas no estágio let (os campos da coleção orders). Os campos _id e stock_item da coleção de join (warehouse) são excluídos com o uso do operador $project.

//? Para fixar.
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

const TRANSACTIONS_DATA = [
  {
    value: 5900,
    from: "Dave America",
    to: "Ned Flanders",
    bank: "International",
  },
  { value: 1000, from: "Mark Zuck", to: "Edna Krabappel", bank: "FloridaBank" },
  {
    value: 209,
    from: "Lisa Simpson",
    to: "Dave America",
    bank: "bankOfAmerica",
  },
  { value: 10800, from: "Arnold Schuz", to: "Mark Zuck", bank: "JPMorgan" },
  { value: 850, from: "Barney Gumble", to: "Lisa Simpson", bank: "Citigroup" },
  {
    value: 76000,
    from: "Ned Flanders",
    to: "Edna Krabappel",
    bank: "JPMorgan",
  },
  { value: 1280, from: "Dave America", to: "Homer Simpson", bank: "Citigroup" },
  {
    value: 7000,
    from: "Arnold Schuz",
    to: "Ned Flanders",
    bank: "International",
  },
  {
    value: 59020,
    from: "Homer Simpson",
    to: "Lisa Simpson",
    bank: "International",
  },
  { value: 100, from: "Mark Zuck", to: "Barney Gumble", bank: "FloridaBank" },
];

db.clients.deleteMany({});
db.transactions.deleteMany({});

db.clients.insertMany(CLIENTS_DATA);
db.transactions.insertMany(TRANSACTIONS_DATA);

//todo: Selecione todos os clientes com as suas respectivas transações feitas;
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      let: { client_name: "$name" },
      pipeline: [{ $match: { $expr: { $eq: ["$from", "$$client_name"] } } }],
      as: "transactions_history",
    },
  },
]);

//todo: Selecione os quatro primeiros clientes com as suas respectivas transações recebidas ordenados pelo estado em ordem alfabética;
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      let: { client_name: "$name" },
      pipeline: [{ $match: { $expr: { $eq: ["$to", "$$client_name"] } } }],
      as: "received_transactions",
    },
  },
  { $sort: { State: 1 } },
  { $limit: 4 },
]);

//todo: Selecione todos os clientes do estado da "Florida" e suas respectivas transações recebidas.
db.clients.aggregate([
  { $match: { State: { $eq: "Florida" } } },
  {
    $lookup: {
      from: "transactions",
      let: { client_name: "$name" },
      pipeline: [{ $match: { $expr: { $eq: ["$to", "$$client_name"] } } }],
      as: "received_transactions",
    },
  },
]);
