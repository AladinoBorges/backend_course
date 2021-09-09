const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/userRouter.js');
const btcRouter = require('./routers/btcRouter.js');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use('/user', userRouter);
app.use('/btc', btcRouter);

app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
