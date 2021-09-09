const { fileReader } = require('./filesReadAndWrite.js');

const FILEPATH = './mocks/usersDatabase.json';

async function validateToken(targetToken) {
  const REGEX = /^[a-zA-Z0-9]{12}$/;

  if (targetToken && REGEX.test(targetToken)) {
    const fileContent = await fileReader(FILEPATH);

    const isTokenValid = fileContent.some(({ token }) => token === String(targetToken));

    return isTokenValid;
  } else {
    return false;
  }
}

module.exports = validateToken;
