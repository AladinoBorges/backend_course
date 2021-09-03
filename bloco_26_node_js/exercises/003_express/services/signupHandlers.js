const crypto = require("crypto");

const database = require("../mocked_databases/users.json");

function generateTokens() {
  const newToken = crypto.randomBytes(16).toString("hex");

  return newToken;
}

function handleSignupInfo(fullname, phone, email, password, role = "User") {
  const info = {
    id: database.length + 1,
    fullname,
    phone,
    email,
    password,
    role,
    token: generateTokens(),
  };

  const validatedInfo =
    fullname && phone && email && password && role ? info : false;

  return validatedInfo;
}

module.exports = { handleSignupInfo };
