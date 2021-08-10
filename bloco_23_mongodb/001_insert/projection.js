// use course;

db.aulas.find({ nome: "aula 1.1" }, { nome: true, tema: true, _id: false });
