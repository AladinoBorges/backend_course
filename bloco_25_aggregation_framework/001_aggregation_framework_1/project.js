//? O operador $project tem como uma de suas funções passar adiante no pipeline apenas alguns campos dos documentos vindos do estágio anterior, fazendo isso por meio de uma "projeção", como no método find({}, { $project }) . Mas aqui temos uma diferença: esses campos podem ser novos, sendo resultado de um cálculo ou de uma concatenação. Assim como numa projeção comum, o único campo que precisa ser negado explicitamente é o _id. Se você especificar um campo que não existe, o $project simplesmente ignorará esse campo, sem afetar em nada a projeção.
db.transactions.aggregate([
  { $project: { _id: false, bank: true, value: true } },
]);

//todo: Quando você nega um campo específico, todos os outros serão incluídos no documento de saída.
db.transactions.aggregate([{ $project: { value: false } }]);

//todo: Para documentos embedados , seguimos os mesmos conceitos de dot notation.
db.books.deleteMany({});

db.books.insertOne({
  _id: 1,
  title: "A Fundação",
  isbn: "0001122223334",
  author: { last: "Asimov", first: "Isaac" },
  copies: 5,
});

db.books.aggregate([{ $project: { "author.id": false, copies: false } }]);

//todo: Incluir campos calculados - podemos usar uma string iniciada com o caractere $ para indicar que queremos projetar um campo, assim: "$nomeDoCampo". A operação a seguir adiciona os novos campos isbn , lastname e copiesSold.
const ISBN = "$isbn";

db.books.aggregate([
  {
    $project: {
      title: true,
      isbn: {
        prefix: { $substr: [ISBN, 0, 3] },
        group: { $substr: [ISBN, 3, 2] },
        publisher: { $substr: [ISBN, 5, 4] },
        title: { $substr: [ISBN, 9, 3] },
        checkDigit: { $substr: [ISBN, 12, 1] },
      },
      lastName: "$author.last",
      copiesSold: "$copies",
    },
  },
]);
