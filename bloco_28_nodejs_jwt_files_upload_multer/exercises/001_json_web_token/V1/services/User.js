const jwt = require("jsonwebtoken");

const { findOne, create } = require("../models/User");

const { JWT_SECRET } = process.env;

async function logUser(username, password) {
  const user = await findOne(username);

  if (!user || user.password !== password) {
    const newError = {
      error: {
        code: "invalidCredentials",
        message: "Username ou passowrd inválido.",
      },
    };

    return newError;
  }

  const payload = {
    username,
    admin: user.admin,
  };

  const jwtConfig = {
    expiresIn: "1h",
    algorithm: "HS256",
  };

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);

  return { token };
}

async function createUser(username, password) {
  const userExists = await findOne(username);

  if (userExists) {
    const newError = {
      error: {
        message: "O usuário já existe.",
        code: "usernameExists",
      },
    };

    return newError;
  }

  const admin = Math.floor(Math.random() * 100) > 50;

  await create(username, password, admin);

  const user = await logUser(username, password);

  return user;
}

module.exports = { createUser, logUser };
