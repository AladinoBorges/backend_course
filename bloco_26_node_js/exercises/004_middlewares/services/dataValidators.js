function usernameValidator(username) {
  const MIN_LENGHT = 4;
  const enforceString = String(username);

  const validatedName = enforceString.length >= MIN_LENGHT;

  return validatedName;
}

function emailValidator(email) {
  const REGEX = /\S+@\S+\.\S+/;

  const validatedEmail = REGEX.test(email);

  return validatedEmail;
}

function passwordValidator(password) {
  const enforceString = String(password);

  const MIN_LENGHT = 4;
  const MAX_LENGHT = 8;

  const checkIfIsNumber = !Number.isNaN(enforceString);
  const validatedLength = enforceString.length >= MIN_LENGHT && enforceString.length <= MAX_LENGHT;
  const validatedPassword = checkIfIsNumber && validatedLength;

  return validatedPassword;
}

module.exports = { usernameValidator, emailValidator, passwordValidator };
