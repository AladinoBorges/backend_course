const { questionInt } = require("readline-sync");

const scripts = [
  {
    name: "Calculator with Promises",
    script: "./numberValidatorPromise.js",
  },
  {
    name: "Calculator with Async/Await",
    script: "./numberValidatorAsyncAwait.js",
  },
];

function generateUserMenu() {
  const userMenu = scripts
    .map(({ name }, index) => `${index + 1}: ${name}`)
    .join("\n");

  return userMenu;
}

function getUserSelection() {
  const userInput = questionInt(
    `Escolha o algoritmo que deseja rodar:\n${generateUserMenu()}\n`,
  );

  const INDEX_TRANSFORMATOR = userInput - 1;
  const getScript = scripts[INDEX_TRANSFORMATOR];

  if (getScript) {
    require(getScript.script);
  } else {
    console.log("\nNúmero inválido. A sair da aplicação ...");
  }
}

getUserSelection();
