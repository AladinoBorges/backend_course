require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PingController, CepController } = require("./controllers");

const ErrorMiddleware = require("./middlewares/error");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.route("/ping").get(PingController);

app.route("/cep/:cep").get(CepController);

app.use(ErrorMiddleware);

const { PORT } = process.env;

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
