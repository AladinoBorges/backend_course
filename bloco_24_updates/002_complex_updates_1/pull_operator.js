//? Operador $pull serve para remover todos os itens iguais a um valor específico:
const FILTERS = { _id: { $in: [1, 2] } };
const UPDATE_VALUES = {
  $pull: { items: { name: { $in: ["pens", "envelopes"] } } },
};
let INSERT_VALUES = [
  {
    _id: 1,
    items: [
      { name: "notepad", price: 35.29, quantity: 2 },
      { name: "envelopes", price: 19.95, quantity: 8 },
      { name: "pens", price: 56.12, quantity: 5 },
    ],
  },
  {
    _id: 2,
    items: [
      { name: "pencil", price: 5.29, quantity: 2 },
      { name: "envelopes", price: 19.95, quantity: 8 },
      { name: "backpack", price: 80.12, quantity: 1 },
      { name: "pens", price: 56.12, quantity: 5 },
    ],
  },
];

use("sales");

db.supplies.deleteMany(FILTERS); // Deleta os documentos atuais para adicionar novamente com novas informações.

db.supplies.insertMany(INSERT_VALUES); // Insere os documentos eliminados.

//todo: Remover do array items os elementos pens e envelopes:
db.supplies.updateMany({}, UPDATE_VALUES);

db.supplies.find().pretty();

//* Remover todos os items que atendem a uma condição diretamente no $pull
db.profiles.insertOne({ _id: 1, votes: [3, 5, 6, 7, 7, 8] });

db.profiles.updateOne({ _id: 1 }, { $pull: { votes: { $gte: 6 } } });

//* Remover itens de um array de documentos
INSERT_VALUES = [
  {
    _id: 1,
    results: [
      { item: "A", score: 5 },
      { item: "B", score: 8, comment: "Strongly agree" },
    ],
  },
  {
    _id: 2,
    results: [
      { item: "C", score: 8, comment: "Strongly agree" },
      { item: "B", score: 4 },
    ],
  },
];

db.survey.insertMany(INSERT_VALUES);

db.survey.updateMany({}, { $pull: { results: { score: 8, item: "B" } } });
