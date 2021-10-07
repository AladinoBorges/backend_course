const { question } = require('readline-sync');
const getUser = require('../models/userModel.js');

async function start() {
  const username = question('Digite o seu nome de usuário:\n');
  const user = await getUser(username);

  if (!user) {
    return console.log('Usuário não encontrado!');
  } else {
    console.log('Aqui estão os seus dados de usuário:\n', user);
  }
}

start();
