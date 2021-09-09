const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * MIDDLEWARES AND ROUTER MIDDLEWARE
const recipesRouter = require('./routers/recipesRouter.js');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/open', (_request, response) => {
  response.send('Open!');
});

app.get('/close', (_request, response) => {
  response.send('Closed!');
});

app.use('/recipes', recipesRouter);

app.all('*', (request, response) => {
  return response.status(404).json({ message: `The route '${request.path}' do not exist!` });
});

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});