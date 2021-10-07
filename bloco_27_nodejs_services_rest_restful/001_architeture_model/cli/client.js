const { question } = require('readline-sync');
const UserModel = require('../models/UserModel');

async function start() {
  const username = question('Digite o seu nome de usuário:\n');
  const user = await UserModel.getUser(username);

  if (!user) {
    return console.log('Usuário não encontrado');
  }

  console.log('Aqui estão os dados do usuário:\n', user);
}

start();
