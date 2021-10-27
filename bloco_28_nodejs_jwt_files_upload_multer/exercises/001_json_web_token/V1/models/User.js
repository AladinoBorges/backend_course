const path = require("path");
const { readFile, writeFile } = require("fs").promises;

const DATA_PATH = path.join(__dirname, "data", "users.json");

async function getAll() {
  const fileContent = await readFile(DATA_PATH, "utf-8").then(JSON.parse);

  return fileContent;
}

async function writeAll(content) {
  await writeFile(DATA_PATH, JSON.stringify(content));
}

async function findOne(username) {
  const userExists = await getAll().then((users) =>
    users.find((user) => user.username === username),
  );

  return userExists;
}

async function create(username, password, admin) {
  await getAll()
    .then((users) => {
      users.push({ username, password, admin });

      return users;
    })
    .then(writeAll);
}

module.exports = { getAll, findOne, create };
