const fs = require('fs');

function filesReader(fileName) {
  try {
    const fileContent = fs.readFileSync(fileName, 'utf8');

    return fileContent;
  } catch (error) {
    return null;
  }
}

module.exports = filesReader;
