// Para esses exemplos você vai utilizar os documentos de uma coleção chamada bios . Caso você queira executar os exemplos localmente, copie o trecho de código que representa a coleção, e execute no seu cliente do MongoDB para inserí-la em sua instância local. Os documentos dessa coleção, de maneira geral, têm esse formato:

const moco_bios = {
  _id: "<value>",
  name: { first: "<string>", last: "<string>" }, // documento embedado ou subdocumento
  birth: "<ISODate>",
  death: "<ISODate>",
  contribs: ["<string>", "..."], // Array de Strings
  awards: [
    { award: "<string>", year: "<number>", by: "<string>" }, // Array de subdocumentos
    "...",
  ],
};

// Query para encontrar e retornar todos os documentos da coleção (documents from collection) 'bios':
db.bios.find();

// Query para encontrar e retornar todos os documentos da coleção (documents from collection) 'bios' que cumpram o valor da query e a projection:
db.bios.find({ _id: 5 });

db.bios.find({ "name.last": "Hopper" });

// Através do segundo parâmetro do método find(), podemos especificar quais atributos serão retornados. O exemplo abaixo retorna todos os documentos da coleção bios, trazendo apenas o atributo name de cada documento:
// ! Procure utilizar a projeção para diminuir a quantidade de campos retornados pelo cursor. Isso ajuda muito no que se refere ao tráfego desses dados na rede.
db.bios.find({}, { name: true });
