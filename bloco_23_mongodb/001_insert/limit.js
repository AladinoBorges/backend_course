// ? O número de documentos retornados por uma consulta pode ser limitado, para isso utiliza-se o método limit(). Esse método é semelhante à declaração LIMIT em um banco de dados que utiliza SQL. O limit() tem como utilização comum, a maximização da performance e evitar que o MongoDB retorne mais resultados do que o necessário para o processamento. O método limit() é utilizado da seguinte forma:
db.bios.find({}, { _id: false, name: true }).limit(3);

db.bios.find().limit(5);
