const fs = require('fs');

function filesWriter(fileName, content) {
  if (!content) {
    return 'invalid parameter number';
  }

  try {
    fs.writeFileSync(`${__dirname}/${fileName}`, content, 'utf8');

    return 'ok';
  } catch (error) {
    return 'file not found';
  }
}

module.exports = filesWriter;
