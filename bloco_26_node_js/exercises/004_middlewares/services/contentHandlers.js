const { fileReader, fileWriter } = require('./filesReadAndWrite.js');

const MOCK_FILE_PATHS = {
  mockedUsers: './mocks/usersDatabase.json',
  mockedPosts: './mocks/postsDatabase.json',
  mockedTeams: './mocks/teamsDatabase.json',
};

// * USERS HANDLERS
async function getPostById(targetId) {
  const { mockedPosts } = MOCK_FILE_PATHS;

  const fileContent = await fileReader(mockedPosts);

  const post = fileContent.find(({ id }) => Number(id) === Number(targetId));

  return post;
}

async function getAllPosts() {
  const { mockedPosts } = MOCK_FILE_PATHS;
  const fileContent = await fileReader(mockedPosts);

  return fileContent;
}

// * TEAMS HANDLERS
async function getAllTeams() {
  const { mockedTeams } = MOCK_FILE_PATHS;

  const teams = await fileReader(mockedTeams);

  return teams;
}

async function createNewTeam(content) {
  const { mockedTeams } = MOCK_FILE_PATHS;

  const teams = await getAllTeams(mockedTeams);

  const newTeam = {
    id: teams.length + 1,
    ...content,
  };

  await fileWriter(mockedTeams, newTeam);
}

module.exports = { getPostById, getAllPosts, getAllTeams, createNewTeam };
