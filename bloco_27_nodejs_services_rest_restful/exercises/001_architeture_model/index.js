const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const middlewares = require("./middlewares");

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app
  .route("/user")
  .get(middlewares.GetAllUsers)
  .post(middlewares.DataValidator, middlewares.CreateUser)
  .delete(middlewares.DeleteByLastName);

app
  .route("/user/:id")
  .get(middlewares.GetUserById)
  .put(middlewares.DataValidator, middlewares.UpdateUserById);

app.route("*").all(middlewares.Error404);

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta: ${PORT}`);
});
