const { ObjectId } = require("mongodb");
const connection = require("./connection.js");

function formatData(data) {
  const formatedData = data.map(({ _id, name, brand }) => ({ id: _id, name, brand }));

  return formatedData;
}

async function getAll() {
  try {
    const products = await connection()
      .then((db) => db.collection("products").find().toArray())
      .then(formatData);

    return products;
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function getById(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const product = await connection()
      .then((db) => db.collection("products").findOne({ _id: ObjectId(id) }))
      .then((result) => {
        if (!result) {
          return null;
        }

        const { _id, name, brand } = result;

        return [{ id: _id, name, brand }];
      });

    return product;
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function add(name, brand) {
  try {
    const product = await connection().then((db) =>
      db.collection("products").insertOne({ name, brand }),
    );

    return [{ id: product.insertedId, name, brand }];
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function update(id, name, brand) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const product = await connection()
      .then((db) =>
        db
          .collection("products")
          .updateOne({ _id: ObjectId(id) }, { $set: { name, brand } }, { returnOriginal: false }),
      )
      .then((result) => result.value);

    if (!product) {
      return add(name, brand);
    } else {
      return product;
    }
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }
}

async function exclude(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const product = await getById(id);

    if (!product) {
      return [{}];
    } else {
      await connection().then((db) => db.collection("products").deleteOne({ _id: ObjectId(id) }));

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
