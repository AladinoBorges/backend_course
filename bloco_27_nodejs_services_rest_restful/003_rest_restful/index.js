require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/products", require("./controllers/ProductsController"));

const { PORT } = process.env || 3000;

app.listen(PORT, function () {
  return console.log(`Aplicação a rodar na porta ${PORT}`);
});
