const { fileReader } = require('./filesReadAndWrite.js');

// const USERS_DATABASE = './mocks/usersDatabase.json';

async function checkIfUSerAlreadyExists(targetUsername, targetEmail, filePath) {
  const fileContent = await fileReader(filePath);

  const validateExistence = fileContent.some(
    ({ username, email }) => username === targetUsername || email === targetEmail,
  );

  console.log('Existence: ', validateExistence);

  return validateExistence;
}

module.exports = checkIfUSerAlreadyExists;
