// ? exists ($exists): verifica a veracidade da existência de um atributo:
db.inventory.find({ qty: { $exists: true } }); //* Essa consulta retorna todos os documentos da coleção inventory em que o atributo qty existe.

db.inventory.find({ qty: { $exists: true, $nin: [5, 15] } }); //* Essa consulta seleciona todos os documentos da coleção inventory em que o atributo qty existe e o seu valor é diferente de 5 e 15.
