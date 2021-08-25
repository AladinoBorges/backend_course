use("storage");

db.samples.aggregate([
  { $project: { value: true, roundedValue: { $round: ["$value"] } } },
]);

//! Observe que para todos os valores, o $round arredondou os valores para o mais próximo, podendo ser maior ou menor. O que interessa aqui é qual o inteiro mais próximo, independente se for maior ou menor que o valor anterior. Essa é uma das diferenças do $round para o $ceil e para o $floor. Outra diferença é que para o $round nós passamos uma array como argumento, em vez de um valor plano , isso acontece, para caso, passemos um segundo parâmetro ele vai arredondar mantendo a quantidade de casas decimais que for definida.
db.samples.aggregate([
  { $project: { value: true, roundedValue: { $round: ["$value", 1] } } },
]);

//? Para fixar. Com o banco de dados storage:
//todo: Retorne o menor número inteiro relativo ao preço de venda de cada produto;
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      floored_price: { $floor: "$sale_price" },
    },
  },
]);

//todo: Retorne o maior número inteiro relativo ao lucro total sobre cada produto. Nota: Desconsiderar taxas (taxes)
db.products.aggregate([
  {
    $project: {
      _id: false,
      name: true,
      ceiled_profit: {
        $ceil: { $subtract: ["$sale_price", "$purchase_price"] },
      },
    },
  },
]);
