const { fileReader } = require('./filesReadAndWrite.js');

const FILEPATH = './mocks/postsDatabase.json';

async function getPostById(targetId) {
  const fileContent = await fileReader(FILEPATH);

  const post = fileContent.find(({ id }) => Number(id) === Number(targetId));

  return post;
}

async function getAllPosts() {
  const fileContent = await fileReader(FILEPATH);

  return fileContent;
}

module.exports = { getPostById, getAllPosts };
