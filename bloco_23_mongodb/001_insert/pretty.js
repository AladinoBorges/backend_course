// ? Com o método pretty() você pode deixar os resultados exibidos no MongoDB Shell um pouco mais legíveis. Esse método aplica uma indentação na exibição dos resultados no console, de forma que fica bem melhor de ler. Exemplo de utilização do método pretty(), usando a coleção bios:
db.bios.find({}, { _id: false, name: true }).limit(5).pretty();

db.bios.find().limit(5).pretty();
