const express = require("express");
const ProductsModel = require("../models/mongo/ProductsModel");
const router = express.Router();

router.get("/", async function (_request, response, _next) {
  const products = await ProductsModel.getAll();

  if (products === null) {
    return response.status(404).json({ message: "Nenhum produto encontrado." });
  } else {
    return response.status(200).json(products);
  }
});

router.get("/:id", async function (request, response, _next) {
  const { id } = request.params;

  const product = await ProductsModel.getById(id);

  if (product === null) {
    return response.status(404).json({ message: "Nenhum produto encontrado." });
  } else {
    return response.status(200).json(product);
  }
});

router.post("/", async function (request, response, _next) {
  const { name, brand } = request.body;

  try {
    const newProduct = await ProductsModel.add(name, brand);

    response.status(200).json(newProduct);
  } catch (error) {
    return response.status(500).json({ message: "Algo deu errado." });
  }
});

router.put("/:id", async function (request, response, _next) {
  const { name, brand } = request.body;
  const { id } = request.params;

  try {
    const products = await ProductsModel.update(id, name, brand);

    response.status(200).json(products);
  } catch (error) {
    return response.status(500).json({ message: "Algo deu errado." });
  }
});

router.delete("/:id", async function (request, response, _next) {
  const { id } = request.params;

  try {
    const products = await ProductsModel.exclude(id);

    response.status(200).json(products);
  } catch (error) {
    return response.status(500).json({ message: "Algo deu errado." });
  }
});

module.exports = router;
