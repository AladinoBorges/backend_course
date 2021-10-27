// ? No Express, nós registramos uma rota utilizando a assinatura app.METODO(caminho, callback) , onde a função de callback recebe três parâmetros: request, response e next.
// * request: comumente chamado de req ; contém as informações enviadas pelo cliente ao servidor.
// * response: geralmente chamado de res; permite o envio de informações do servidor de volta ao cliente.
// * next: função que diz para o Express que aquele callback terminou de ser executado, e que ele deve prosseguir para executar o próximo callback para aquela rota. Este parâmetro é opcional e você entenderá melhor o uso do next em breve.
const express = require("express");

const app = express();

// todo: Rota com o caminho '/' e método GET (pedir ou pegar algum dado)
app.get("/", (_request, response) => {
  response.send("Olá mundo da página inicial.");
});

// todo: Rota com o caminho '/' e método POST ()
app.post("/", (_request, response) => {
  response.send("Postado na página inicial com sucesso.");
});

// todo: Rota com o caminho '/' e método PUT ()
app.put("/", (_request, response) => {
  response.send(" com sucesso na página inicial.");
});

// todo: Rota com o caminho '/' e método DELETE (apagar um dado)
app.delete("/", (_request, response) => {
  response.send("Apagado com sucesso na página inicial.");
});

// todo: Rota com o caminho '/' e método ALL ()
app.all("/", (_request, response) => {
  response.send(" com sucesso na página inicial.");
});

// ! É possível fazer o encadeamento de requisições para evitar a repetição das rotas:
app
  .route("/encadeados")
  .get((_request, response) => {
    response.send("GET da rota com requisições encadeadas.");
  })
  .post((_request, response) => {
    response.send("POST da rota com requisições encadeadas.");
  })
  .put((_request, response) => {
    response.send("PUT da rota com requisições encadeadas.");
  })
  .delete((_request, response) => {
    response.send("DELETE da rota com requisições encadeadas.");
  })
  .all((_request, response) => {
    response.send("ALL da rota com requisições encadeadas.");
  });

app.listen(3000, () => {
  console.log("Aplicação a rodar na porta 3000.");
});
