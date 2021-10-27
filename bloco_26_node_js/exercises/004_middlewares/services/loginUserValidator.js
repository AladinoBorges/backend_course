const { fileReader } = require('./filesReadAndWrite.js');

const FILEPATH = './mocks/usersDatabase.json';

async function validateUserLogin(targetEmail, targetPassword) {
  const fileContent = await fileReader(FILEPATH);

  const logedIn = fileContent.some(
    ({ email, password }) => email === targetEmail && String(password) === String(targetPassword),
  );

  if (logedIn) {
    const user = fileContent.find(
      ({ email, password }) => email === targetEmail && String(password) === String(targetPassword),
    );

    return user.token;
  }

  return logedIn;
}

module.exports = validateUserLogin;
