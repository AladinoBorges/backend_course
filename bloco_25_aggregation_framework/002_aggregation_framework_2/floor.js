//? Já a expressão $floor retorna o maior número inteiro menor ou igual ao número especificado, ou seja, faz um arredondamento para baixo.
use("storage");

db.samples.aggregate([
  { $project: { value: true, floorValue: { $floor: "$value" } } },
]);
