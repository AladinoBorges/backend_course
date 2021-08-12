//* db.collection.updateMany(FILTERS, UPDATE, OPTIONS);

// todo: o método db.colecao.updateMany() é utilizado para alterar todos os documentos da coleção inventory em que o valor do campo qty seja menor do que 50:
db.inventory.updateMany({ qty: { $lt: 50 } }, { $set: { "size.uom": "in", status: "P" } });

//* e você tiver 10 documentos na coleção inventory em que o valor do campo qty seja menor do que 50 (esse valor foi passado como parâmetro do filtro e utilizou o operador $lt), todos esses documentos serão alterados em uma única operação.

// ! Chamando o método db.colecao.updateMany() com o parâmetro de filtro vazio { }, o resultado é a atualização de todos os documentos presentes em colecao.