//? Operador de data corrente ($currentDate)
//* O operador $currentDate atribui ao valor de um campo a data corrente, utilizando um tipo Date ou timestamp. Se você não especificar o tipo, por padrão, o MongoDB atribuirá o valor do tipo Date. O operador $currentDate tem a seguinte forma:
// { $currentDate: { <campo>: <typeSpecification>, ... } };

// ! typeSpecification pode ser:
    //* um valor booleano true para atribuir o valor da data corrente ao campo utilizando o tipo Date;
    //* um documento que especifica o tipo do campo. Esse documento pode ser { $type: "timestamp" } ou { $type: "date" }. Esse operador é case-sensitive e aceita somente letras minúsculas: timestamp ou date.

// use trybe;
db.customers.insertOne({ _id: 1, status: "a", lastModified: ISODate("2013-10-02T01:11:18.965Z") });

//todo: Com a operação abaixo, é possível alterar o valor do campo lastModified para a data corrente e criar o campo cancellation.date com o timestamp corrente, utilizando o operador $currentDate, e ainda alterar o campo status para D e criar o campo cancellation.reason com o valor "user request", utilizando o operador $set:
db.customers.update({ _id: 1 }, { $currentDate: { lastModified: true, "cancellation.date": {  $type: "timestamp" } }, $set: { "cancellation.reason": "user request", status: "D" } });
