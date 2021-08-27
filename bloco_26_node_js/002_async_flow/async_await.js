//? Nem sempre queremos utilizar a API das Promises. Muitas vezes, queremos simplesmente buscar o resultado e pronto. E é aí que entra o async/await. Essas duas palavras-chave foram criadas para trabalhar com Promises como se estivéssemos a trabalhar com código síncrono. A questão é que toda função na qual utilizamos async, automaticamente passa a retornar uma Promise, que será rejeitada em caso de erro, e resolvida em caso de sucesso. O resultado de usarmos async/await é que o código fica com uma sintaxe quase idêntica à sintaxe utiliada para código síncrono.
const fs = require("fs").promises;

const FILE = "./texts/from_algoritm.txt";
const TEXT = "Este é o texto que será concatenado ao atual do arquivo.";
const ENCODING = "utf8";

async function reader(file, encoding) {
  try {
    const text = await fs.readFile(file, encoding);
    return text;
  } catch ({ message }) {
    console.error(`Erro ao ler o arquivo ${file}.\nErro: ${message}`);
  }
}

async function main(file, text, encoding) {
  try {
    const fromFile = await reader(file, encoding);
    const content = fromFile + "\n" + text;

    await fs.writeFile(file, content);
    console.log("Arquivo escrito com sucesso!");
  } catch ({ message }) {
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

//! Perceba que, para podermos utilizar o async/await, precisamos criar uma função main e colocar nossa lógica dentro dela. Isso acontece porque, por enquanto, o await só pode ser utilizado dentro de funções async. Repare também que não temos mais nenhum .then, e que todo o tratamento de erro e sucesso foi feito com um try ... catch , da mesma forma que fizemos quando estávamos utilizando o fs.readFileSync. Ainda sobre o writeFile, você pode especificar algumas opções na escrita de arquivos passando um terceiro parâmetro opcional para os métodos writeFile e writeFileSync. A opção flag especifica como o arquivo deve ser aberto e manipulado. O padrão é 'w', que especifica que o arquivo deve ser aberto para escrita. Se o arquivo não existir, ele é criado. Caso contrário, ele é reescrito, ou seja, tem seu conteúdo apagado antes de o novo conteúdo ser escrito. A flag 'wx', por exemplo, funciona como 'w', mas lança um erro caso o arquivo já exista.

main(FILE, TEXT, ENCODING); //* A função main é a writer.

/*
* const fs = require('fs').promises;

A flag wx abre o arquivo para escrita **apenas** caso ele não exista. Caso o contrário, um erro será lançado
* fs.writeFile('./meu-arquivo.txt', 'Eu estive aqui :eyes:', { flag: 'wx' })
  * .then(() => {
    * console.log('Arquivo salvo');
  * })
  * .catch((err) => {
Se o arquivo existir, um erro é retornado
    * console.error('err');
  * });
*/
