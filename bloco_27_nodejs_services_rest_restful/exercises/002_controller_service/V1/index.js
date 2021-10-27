require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  PingController,
  findAllAdresses,
  findAddressByCEP,
  createNewAddress,
} = require("./controllers");

const { validateCEP, cepExists, validateRequestBody, error } = require("./middlewares");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.route("/ping").get(PingController);

app.route("/cep").get(findAllAdresses).post(cepExists, validateRequestBody, createNewAddress);
app.route("/cep/:cep").get(validateCEP, findAddressByCEP);

app.use(error);

const { PORT } = process.env;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
