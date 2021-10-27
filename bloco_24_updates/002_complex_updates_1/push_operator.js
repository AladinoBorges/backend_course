//? O operador $push adiciona um valor a um array . Se o campo não existir no documento, um novo array com o valor em um elemento será adicionado. Sintaxe:
//* { $push: { CAMPO: VALOR, ... }}

//? Em conjunto com o $push, você pode utilizar o que chamamos de modificadores. Cada um desses modificadores tem funções específicas que você verá melhor com exemplos. São eles:
//* $each: adiciona múltiplos valores a um array;
//* $slice: limita o número de elementos do array. Requer o uso do modificador $each;
//* $sort: ordena os elementos do array. Requer o uso do modificador $each;
//* $position: especifica a posição do elemento que está sendo inserido no array. Também requer o modificador $each. Sem o modificador $position, o operador $push adiciona o elemento no final do array.

const UPSERT = { upsert: true };
const FILTERS = { _id: 1 };
const VALUES = { items: { name: "notepad", price: 35.29, quantity: 2 } };

use("sales");

db.supplies.updateOne({}, { $unset: { items: "" } });

db.supplies.updateOne(FILTERS, { $push: VALUES }, UPSERT);

//? Para adicionar múltiplos valores ao array, usa-se o operador $each em combinação com o $push.

//todo: A operação abaixo adicionará mais dois produtos ao array items do primeiro documento na coleção supplies.
VALUES = {
  items: {
    $each: [
      { name: "pens", price: 56.12, quantity: 5 },
      { name: "envelopes", price: 19.95, quantity: 8 },
    ],
  },
};

db.supplies.updateOne({}, { $push: VALUES }, UPSERT);

//todo: Modificadores múltiplos.
VALUES = {
  items: {
    $each: [
      { name: "pensil", price: 35.29, quantity: 2 },
      { name: "blank books", price: 19.95, quantity: 8 },
      { name: "backpack", price: 80.99, quantity: 13 },
    ],
    $sort: { quantity: -1 },
    $slice: 5,
  },
};

db.supplies.updateOne(FILTERS, { $push: VALUES }, UPSERT);

//! Essa operação utiliza os seguintes modificadores:
//* O modificador $each para adicionar múltiplos documentos ao array items;
//* O modificador $sort para ordenar todos os elementos alterados no array items pelo campo quantity em ordem descendente;
//* E o modificador $slice para manter apenas os dois primeiros elementos ordenados no array items.

db.supplies.find().pretty();
