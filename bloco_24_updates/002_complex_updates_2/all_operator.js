//? O operador $all seleciona todos os documentos em que o valor do campo é um array que contenha todos os elementos especificados. Se compararmos aos operadores que já conhecemos, esse operador é equivalente ao operador $and, pois fará a comparação de todos os valores especificados, porém, para arrays.
const LIST = ["red", "blank"];
use("trybe");

db.inventory.find({ tags: LIST }); //* esta query retornará somente os documentos em que o array tags seja exatamente igual ao passado como parâmetro no filtro, ou seja, contenha apenas esses dois elementos, na mesma ordem.

db.inventory.find({ tags: { $all: LIST } }); //* esta analisará o mesmo array , independentemente da existência de outros valores ou a ordem em que os elementos estejam.

//* Utilizar o $all poupa um pouco de código. Veja um exemplo utilizando o $all:
db.inventory.find({ tags: { $all: LIST } });

//* O seu equivalente, utilizando o $and:
db.inventory.find({ $and: [{ tags: "ssl" }, { tags: "security" }] });
