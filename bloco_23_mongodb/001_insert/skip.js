// ? Acione o método skip() para controlar a partir de que ponto o MongoDB começará a retornar os resultados. Essa abordagem pode ser bastante útil para realizar paginação dos resultados. O método skip() precisa de um parâmetro numérico que determinará quantos documentos serão "pulados" antes de começar a retornar. O exemplo abaixo na coleção bios pulará os dois primeiros documentos e retornará o cursor a partir daí:
db.bios.find().skip(8).pretty();

db.bios.find({}, { name: true }).limit(4).skip(6).pretty();
