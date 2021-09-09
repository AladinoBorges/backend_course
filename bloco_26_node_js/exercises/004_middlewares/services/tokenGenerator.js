const crypto = require('crypto');

function generateTokens() {
  const newToken = crypto.randomBytes(6).toString('hex');

  return newToken;
}

module.exports = generateTokens;
