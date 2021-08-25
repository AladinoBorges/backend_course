//? O operador $expr permite que você utilize expressões de agregação e construa queries que comparem campos no mesmo documento.
const DATA = [
  { _id: 1, category: "food", budget: 400, spent: 450 },
  { _id: 2, category: "drinks", budget: 100, spent: 150 },
  { _id: 3, category: "clothes", budget: 100, spent: 50 },
  { _id: 4, category: "misc", budget: 500, spent: 300 },
  { _id: 5, category: "travel", budget: 200, spent: 650 },
];

const FILTERS = ["$spent", "$budget"];

use("trybe");

db.monthlyBudget.insertMany(DATA);

db.monthlyBudget.find({ $expr: { $gt: FILTERS } }); //* esta query utiliza o operador $expr para buscar os documentos em que o valor de spent exceda o valor de budget.

//! Note que, na query, nenhum valor foi especificado explicitamente. O que acontece é que o operador $expr entende que deve comparar os valores dos dois campos. Por isso o $ é utilizado, indicando que a string entre aspas referencia um campo. Mais à frente no curso, você verá muito mais aplicações para o operador $expr dentro do tópico sobre Aggregation Framework, e verá que suas queries ficarão muito mais poderosas!
