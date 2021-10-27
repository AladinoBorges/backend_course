//? Operador de renomeação ($rename)
//* Para renomear um determinado atributo de um ou mais documentos, usa-se o operador $rename.
// use trybe;
db.fruits.insertOne({ _id: 100, name: "Banana", quantity: 100, inStock: true });

db.fruits.update({ name: "Banana" }, { $rename: { name: "productName" } });
