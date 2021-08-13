//? Para remover o primeiro ou o último elemento de um array, utiliza-se o operador $pop. Se passar o valor -1 o $pop remove o primeiro elemento do array, caso se passe o valor 1 removerá o último.
//* Remover o primeiro elemento da collection:
const FILTERS = { _id: 1 };
let VALUES = { items: -1 };

use("sales");

db.supplies.updateOne(FILTERS, { $pop: VALUES });

//* Remover o último elemento da collection:
VALUES = { items: 1 };

db.supplies.updateOne(FILTERS, { $pop: VALUES });
