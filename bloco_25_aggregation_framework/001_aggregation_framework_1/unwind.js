//? O operador $unwind "desconstrói" um campo array do documento de entrada e gera como saída um documento para cada elemento do array. Cada documento de saída é o documento de entrada com o valor do campo array substituído por um elemento do array.
db.inventory.deleteOne({ _id: 7 });

db.inventory.insertOne({ _id: 7, item: "ABC1", sizes: ["S", "M", "L"] });

db.inventory.aggregate([{ $unwind: "$sizes" }]);
