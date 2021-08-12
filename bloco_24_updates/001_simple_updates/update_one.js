//* db.collection.updateOne(FILTERS, UPDATE, OPTIONS);

// todo: o método db.colecao.updateOne() é utilizado para alterar o primeiro documento na coleção inventory em que o campo item seja igual a "paper".
db.inventory.updateOne({ item: "paper" }, { $set: { "size.uom": "cm", status: "P" } });