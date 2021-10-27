require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const controllers = require("./controllers");
const middlewares = require("./middlewares");

const { PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/users/me", middlewares.auth, controllers.me);
app.get("/top-secret", middlewares.auth, middlewares.admin, controllers.topSecret);
app.post("/login", controllers.login);
app.post("/signup", controllers.signup);

app.all("*", (_request, response) => {
  return response.status(404).json({ message: "Ups ... Página não encontrada." });
});
app.listen(PORT, () => {
  console.log(`Aplicação conectada na porta ${PORT}.`);
});
