const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouter.js');
const btcRouter = require('./routers/btcRouter.js');
const postsRouter = require('./routers/postsRouter.js');
const routeNotFound = require('./middlewares/routeNotFound.js');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use('/user', userRouter);
app.use('/btc', btcRouter);
app.use('/posts', postsRouter);

app.use('*', (_request, _response, next) => {
  return next({ statusCode: 404, message: 'Opsss, route not found!' });
});

app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
