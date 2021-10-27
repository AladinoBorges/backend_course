//? O operador $mul multiplica o valor de um campo por um número especificado, persistindo o resultado dessa operação sem a necessidade do operador $set.
// use trybe;
db.products.insertOne({ _id: 1, item: "ABC", price: NumberDecimal("10.99"), qty: 25 });

db.products.update({ _id: 1 }, { $mul: { price: NumberDecimal("1.25"), qty: 2 } });

//! Você pode utilizar o $mul em um campo que não exista no documento. Nesse caso, o operador criará o campo e atribuirá a ele o valor zero do mesmo tipo numérico do multiplicador.

db.products.insertOne({ _id: 2, item: "Unknown" });

db.products.update({ _id: 2 }, { $mul: { price: NumberLong("100") } });

//* Como resultado, temos o campo price criado no documento com valor zero do mesmo tipo numérico do multiplicador. Nesse caso, o tipo é NumberLong. Você também pode multiplicar valores com tipos diferentes:
db.products.insertOne({ _id: 3, item: "XYZ", price: NumberLong("10") });

db.products.update({ _id: 3 }, { $mul: { price: NumberInt(5) } });
