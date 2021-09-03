const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  fileReader,
  fileWriter,
  filePaths,
} = require("./services/filesReaderAndWriter.js");
const simpsonsDatabase = require("./mocked_databases/simpsons.json");

const mockedDatabase = [...simpsonsDatabase];

const MINUS_X = -1;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// todo 1. Rota GET /ping que deve retornar o seguinte JSON: { message: 'pong' }.
app.route("/ping").get((_request, response) => {
  response.status(200).json({ message: "pong" });
});

// todo 2. Rota POST /hello que deve receber, no body da requisição, o seguinte JSON: { "name": "<nome do usuário>" }; e deve retornar o seguinte JSON: { "message": "Hello, <nome do usuário>!" }.
app.route("/hello").post((request, response) => {
  const { name } = request.body;

  response.status(201).json({ message: `Hello, ${name}` });
});

// todo 3. Rrota POST /greetings que deve receber o seguinte JSON: { "name": "<nome do usuário>", "age": <idade do usuário> }.
// * caso a pessoa usuária tenha idade superior a 17 anos, devolve o JSON { "message": "Hello, <nome do usuário>!" } com o status code 200 - OK;
// * Caso a pessoa usuária tenha 17 anos ou menos, devolva o JSON { "message": "Unauthorized" } com o status code 401 - Unauthorized.

// todo 4. Rota PUT /users/:name/:age que deve retornar o seguinte JSON: { "message": "Seu nome é <name> e você tem <age> anos de idade" }.

// todo 5. Criar uma API de dados das personagens de Simpsons:
// * Utilize o modulo fs do Node para ler/escrever arquivos;
// * Caso algum erro ocorra, deve ser retornado um código 500 (Internal Server Error);
// * Caso dê tudo certo, a resposta deve voltar com status 200 OK;
// * Para testar sua API durante o desenvolvimento, utilize ferramentas que permitem fazer requisições HTTP, como Postman, Insomnia, httpie ou Thunder Client.

// todo 6. Criar um endpoint GET /simpsons. O endpoint deve retornar um array com todos os Simpsons.

// todo 7. Criar um endpoint GET /simpsons/:id. O endpoint deve retornar o personagem com o id informado na URL da requisição. Caso não exista nenhum personagem com o id especificado, retorne o JSON { message: 'simpson not found' } com o status 404 - Not Found.

// todo 8. Criar um endpoint POST '/simpsons':
// * Este endpoint deve cadastrar novos personagens;

// * O corpo da requisição deve receber o seguinte JSON: { id: <id-da-personagem>, name: '<nome-da-personagem>' };
// * Caso já exista uma personagem com o id informado, devolva o JSON { message: 'id already exists' } com o status 409 - Conflict;

// * Caso a personagem ainda não exista, adicione-a ao arquivo simpsons.json e devolva um body vazio com o status 204 - No Content . Para encerrar a request sem enviar nenhum dado, você pode utilizar 'res.status(204).end();'.

app.route("*").all((request, response) => {
  const insertedPath = request.path;

  return response
    .status(404)
    .json({ Erro: `A rota '${insertedPath}' não existe` });
});

app.listen(3000, () => {
  console.log("Aplicação a rodar na porta 3000.");
});