//? O operador $text faz uma busca "textual" em um campo indexado por um text index. O operador $text, por padrão, não retorna os resultados ordenados pelas pontuações (score). A expressão para utilizar o $text tem a seguinte sintaxe:
/*
    {
        text: {
            $search: <string>,
            $language: <string>,
            $caseSensitive: <boolean>,
            $diacriticSensitive: <boolean>
        },
    }
*/

//* onde:
//* $search: Uma string com os termos que o MongoDB utilizará para fazer o parse e utilizará como filtro. Internamente, o MongoDB faz uma busca lógica (OR) sobre os termos, a menos que seja especificado como uma frase inteira;

//* $language: Opcional. Esse campo determina a lista de stop words que será utilizada na tokenização da busca.Se você passar o valor none, a busca utilizará uma tokenização simples sem utilizar nenhuma lista de stop words;

//* $caseSensitive: Opcional. Recebe um valor booleano para habilitar ou desabilitar buscas case sensitive. O valor default é false, o que faz com que as buscas sejam case-insensitive.

//* $diacriticSensitive: Opcional. Recebe um valor booleano para habilitar ou desabilitar busca diacritic sensitive("https://docs.mongodb.com/manual/reference/operator/query/text/#text-operator-diacritic-sensitivity". O valor default também é false.

//! O score é atribuído a cada documento que contenha o termo procurado no campo. Esse score representa a relevância do documento para a busca textual aplicada. O score pode ser parte do método sort() ou parte de uma projeção.

//todo: Para começar a trabalhar com o operador $text, primeiro é necessário que se crie um índice do tipo text:
use("trybe");

db.articles.createIndex({ subject: "text" });

const DATA = [
  { _id: 1, subject: "coffee", author: "xyz", views: 50 },
  { _id: 2, subject: "Coffee Shopping", author: "efg", views: 5 },
  { _id: 3, subject: "Baking a cake", author: "abc", views: 90 },
  { _id: 4, subject: "baking", author: "xyz", views: 100 },
  { _id: 5, subject: "Café Com Leite", author: "abc", views: 200 },
  { _id: 6, subject: "Сырники", author: "jkl", views: 80 },
  { _id: 7, subject: "coffee and cream", author: "efg", views: 10 },
  { _id: 8, subject: "Cafe com Leite", author: "xyz", views: 10 },
];

db.articles.insertMany(DATA);

//* A query abaixo utiliza os operadores $text e $search para buscar todos os documentos que contenham o termo coffee.
db.articles.find({ $text: { $search: "coffee" } });

//* procurar por vários termos passando uma string delimitada por espaços . O operador $text fará uma busca lógica OR por cada um desses termos, retornando os documentos que contenham qualquer um deles. A query abaixo especifica três termos ("bake coffee cake") para a string $search.
db.articles.articles({ $text: { $search: "bake coffee cake" } });

//* Procurar por frases também é possível. A query abaixo procura pela frase "coffee shop".
db.articles.find({ $text: { $search: '"coffee shop"' } });
