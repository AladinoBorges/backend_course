module.exports = function formatCEP(cep) {
  const formated = String(cep)
    .split("")
    .map((char, index) => (index === 4 ? char.concat("-") : char))
    .join("");

  return formated;
};
