const MIN_AGE = 17;

function ageValidator(age) {
  const stringToNumber = Number(age);

  const result = stringToNumber > MIN_AGE;

  return result;
}

function userInfoValidator(name, age) {
  const stringToNumber = Number(age);

  const result = {
    userName: name !== undefined ? String(name) : "Guest",
    userAge: stringToNumber ? stringToNumber : MIN_AGE,
  };

  return result;
}

module.exports = { ageValidator, userInfoValidator };
