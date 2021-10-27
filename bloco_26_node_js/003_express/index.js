const express = require("express");

const app = express();

app.get("/hello", handleHelloWorldRequest);

app.listen(3001, () => {
  console.log("A aplicação está a ouvir a porta 3001.");
});

function handleHelloWorldRequest(req, res) {
  res.status(200).send("Olá caro mundo das APIs!");
}

// todo: Este pequeno sript faz:
/*
 * Cria uma nova aplicação Express;
 * Diz ao Express que, quando uma requisição com método GET for recebida no caminho /hello , a função handleHelloWorldRequest deve ser chamada;
 * Pede ao Express que crie um servidor HTTP e escute por requisições na porta 3001;
 * Ao tratar uma requisição com método GET no caminho /hello, envia o status HTTP 200 que significa OK e a mensagem "Olá caro mundo das APIs!".
 */
