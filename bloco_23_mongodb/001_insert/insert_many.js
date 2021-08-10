// use database_name;

db.aulas.insertMany([
    {
        _id: 2,
        nome: "aula 1",
        tema: "mongodb: introdução"
    },
    {
        _id: 3,
        nome: "aula 1.1",
        tema: "mongodb: insert one"
    },
    {
        _id: 4,
        nome: "aula 1.2",
        tema: "mongodb: insert many"
    }
], { ordered: false });
