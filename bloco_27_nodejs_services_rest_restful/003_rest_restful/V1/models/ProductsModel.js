const connection = require("./connection.js");

async function getAll() {
  try {
    const [rows] = await connection.query("SELECT * FROM products");

    return rows;
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function getById(id) {
  try {
    const [result] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);

    return result;
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function add(name, brand) {
  try {
    const [result] = await connection.query(`Insert INTO products (name, brand) VALUES (?, ?);`, [
      name,
      brand,
    ]);

    return { id: result.insertedId, name, brand };
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function update(id, name, brand) {
  try {
    await connection.query("UPDATE products SET name = ?, brand = ? WHERE id = ?", [
      name,
      brand,
      id,
    ]);
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function exclude(id) {
  try {
    const product = await getById(id);

    if (!product) {
      return [{}];
    } else {
      await connection.query("DELETE FROM products WHERE id = ?", [id]);

      return product;
    }
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
};
