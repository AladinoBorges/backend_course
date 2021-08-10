// ? sort(): Quando existe a necessidade de ordenar os documentos por algum atributo, o método sort() se mostra muito útil. Usando um valor positivo ( 1 ) como valor do atributo, os documentos da consultas são ordenados de forma crescente ou alfabética (também ordena por campos com strings ). Em complemento, usando um valor negativo ( -1 ), os documentos de saída estarão em ordem decrescente ou contra alfabética. Ele pode ser combinado com o método find().
//* Sintaxe:
db.colection_name.find().sort({ nome_do_campo: "1 ou -1" });
db.colection_name.find({}, { value, name }).sort({ value: -1 }, { name: 1 });
