const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  fileReader,
  fileWriter,
  filePaths: { simpsons, users },
} = require("./services/filesReaderAndWriter.js");

const {
  ageValidator,
  userInfoValidator,
  userTokenValidator,
} = require("./services/validators.js");

const {
  findPersonageById,
  checkIfIdExists,
  checkIfEmailExists,
} = require("./services/databaseInfoHandlers.js");

const { handleSignupInfo } = require("./services/signupHandlers.js");

function handleReader(database) {
  const result = fileReader(database);

  return result;
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

// ? EXERCÍCIOS BÔNUS
// todo 1. Adicione autenticação a todos os endpoints.
// * O token deve ser enviado através do header Authorization;
// * token deve ter exatamente 16 caracteres;
// * Caso o token seja inválido ou inexistente, a resposta deve possuir o status 401 - Unauthorized e o JSON { message: 'Token inválido!' }.

// todo 2. Crie uma rota POST /signup.
// * A rota deve receber, no body da requisição, os campos email , password , firstName e phone;
// * Caso algum dos campos não esteja preenchido, a response deve possuir status 401 - Unauthorized e o JSON { message: 'missing fields' };
// * Caso todos os parâmetros estejam presentes, a rota deve gerar um token aleatório válido, e a resposta deve conter o status 200 - OK, e o JSON { token: '<token-aleatorio>' }.
app.route("/signup").post(async (request, response) => {
  const { fullname, phone, email, password, role } = request.body;

  const usersDatabase = await handleReader(users);

  const checkEmailExistence = checkIfEmailExists(usersDatabase, email);

  if (checkEmailExistence) {
    return response.status(409).json({ message: "Email already exists." });
  }

  const handleInfo = await handleSignupInfo(
    fullname,
    phone,
    email,
    password,
    role,
  );

  if (handleInfo) {
    usersDatabase.push(handleInfo);

    await fileWriter(users, usersDatabase);

    return response.status(200).json({ Token: handleInfo.token });
  } else {
    response.status(401).json({ message: "Missing fields." });
  }
});

// ? EXERCÍCIOS

// todo 1. Rota GET /ping que deve retornar o seguinte JSON: { message: 'pong' }.
app.route("/ping").get((request, response) => {
  const token = request.headers.authorization;

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  response.status(200).json({ message: "pong" });
});

// todo 2. Rota POST /hello que deve receber, no body da requisição, o seguinte JSON: { "name": "<nome do usuário>" }; e deve retornar o seguinte JSON: { "message": "Hello, <nome do usuário>!" }.
app.route("/hello").post((request, response) => {
  const { name } = request.body;
  const token = request.headers.authorization;

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  response.status(201).json({ message: `Hello, ${name}` });
});

// todo 3. Rrota POST /greetings que deve receber o seguinte JSON: { "name": "<nome do usuário>", "age": <idade do usuário> }.
// * caso a pessoa usuária tenha idade superior a 17 anos, devolve o JSON { "message": "Hello, <nome do usuário>!" } com o status code 200 - OK;
// * Caso a pessoa usuária tenha 17 anos ou menos, devolva o JSON { "message": "Unauthorized" } com o status code 401 - Unauthorized.
app.route("/greetings").post((request, response) => {
  const { name, age } = request.body;
  const token = request.headers.authorization;

  const validatedAge = ageValidator(age);

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  if (!validatedAge) {
    return response.status(401).json({ message: "Unauthorized" });
  } else {
    response.status(200).json({ message: `Hello, ${name}` });
  }
});

// todo 4. Rota PUT /users/:name/:age que deve retornar o seguinte JSON: { "message": "Seu nome é <name> e você tem <age> anos de idade" }.
app.route("/users/:name/:age").put((request, response) => {
  const { name, age } = request.params;
  const token = request.headers.authorization;

  const validated = userInfoValidator(name, age);

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  if (validated.userAge < 18) {
    return response.status(401).json({
      message: "Underage users cannot be registered.",
    });
  } else {
    response.status(200).json({
      message: `O seu nome é ${validated.userName} e você tem ${validated.userAge} anos de idade.`,
    });
  }
});

// todo 5. Criar uma API de dados das personagens de Simpsons:
// * Utilize o modulo fs do Node para ler/escrever arquivos;
// * Caso algum erro ocorra, deve ser retornado um código 500 (Internal Server Error);
// * Caso dê tudo certo, a resposta deve voltar com status 200 OK;
// * Para testar sua API durante o desenvolvimento, utilize ferramentas que permitem fazer requisições HTTP, como Postman, Insomnia, httpie ou Thunder Client.

// todo 6. Criar um endpoint GET /simpsons. O endpoint deve retornar um array com todos os Simpsons.

// todo 8. Criar um endpoint POST '/simpsons':
// * Este endpoint deve cadastrar novos personagens;
// * O corpo da requisição deve receber o seguinte JSON: { id: <id-da-personagem>, name: '<nome-da-personagem>' };
// * Caso já exista uma personagem com o id informado, devolva o JSON { message: 'id already exists' } com o status 409 - Conflict;
// * Caso a personagem ainda não exista, adicione-a ao arquivo simpsons.json e devolva um body vazio com o status 204 - No Content . Para encerrar a request sem enviar nenhum dado, você pode utilizar 'res.status(204).end();'.

app
  .route("/simpsons")
  .get(async (request, response) => {
    const token = request.headers.authorization;

    const databaseExistenceValidator = await handleReader(simpsons);

    const validatedToken = userTokenValidator(token);

    if (!validatedToken) {
      return response.status(401).json({ message: "Token inválido." });
    }

    if (databaseExistenceValidator) {
      return response.status(200).json(databaseExistenceValidator);
    } else {
      response.status(500).json({ Erro: "Internal Server Error." });
    }
  })
  .post(async (request, response) => {
    const { id, name } = request.body;
    const token = request.headers.authorization;

    const simpsonsDatabase = await handleReader(simpsons);

    const validatedToken = userTokenValidator(token);

    if (!validatedToken) {
      return response.status(401).json({ message: "Token inválido." });
    }

    const personageValidator = checkIfIdExists(simpsonsDatabase, id);

    if (personageValidator) {
      return response.status(409).json({ message: `id ${id} already exists.` });
    } else {
      simpsonsDatabase.push({ id, name });

      await fileWriter(simpsons, simpsonsDatabase);

      response.status(204).end();
    }
  });

// todo 7. Criar um endpoint GET /simpsons/:id. O endpoint deve retornar o personagem com o id informado na URL da requisição. Caso não exista nenhum personagem com o id especificado, retorne o JSON { message: 'simpson not found' } com o status 404 - Not Found.
app.route("/simpsons/:id").get(async (request, response) => {
  const { id } = request.params;
  const token = request.headers.authorization;

  const simpsonsDatabase = await handleReader(simpsons);

  const personage = findPersonageById(simpsonsDatabase, id);

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  if (!personage) {
    return response.status(404).json({ message: "Simpson not found." });
  } else {
    response.status(200).json(personage);
  }
});

app.route("*").all((request, response) => {
  const insertedPath = request.path;
  const token = request.headers.authorization;

  const validatedToken = userTokenValidator(token);

  if (!validatedToken) {
    return response.status(401).json({ message: "Token inválido." });
  }

  return response
    .status(404)
    .json({ Erro: `A rota '${insertedPath}' não existe` });
});

app.listen(3000, () => {
  console.log("Aplicação a rodar na porta 3000.");
});
