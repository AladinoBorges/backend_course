//? Operador para remover campos ($unset)
//* Para remover um ou mais campos de um documento, utilize o operador $unset.
// use trybe;

//todo: A operação abaixo remove o campo quantity do documento em que o valor do campo productName seja igual a Banana:
db.fruits.updateMany({ productName: "Banana" }, { $unset: { quantity: "" } });
