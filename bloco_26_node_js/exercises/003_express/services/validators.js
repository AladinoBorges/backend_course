function ageValidator(age) {
  const MIN_AGE = 18;
  const stringToNumber = Number(age);

  const result = stringToNumber >= MIN_AGE;

  return result;
}

module.exports = { ageValidator };
