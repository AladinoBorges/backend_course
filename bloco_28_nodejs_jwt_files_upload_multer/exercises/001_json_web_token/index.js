require('dotenv').config();

const express = require('express');
const cors = require('cors');

const LoginRouter = require('./routes/LoginRoutes');
const UserRouter = require('./routes/UserRoutes');
const ErrorMiddleware = require('./middlewares/ErrorsMiddleware');

const { PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/login', LoginRouter);
app.use('/users', UserRouter);
app.use('/top-secret', UserRouter);

app.all('*', (_request, response, _next) => {
  return response.status(404).json({ message: 'Luke, i\'m not your father ... (heavy breathing)' });
});

app.use(ErrorMiddleware);
app.listen(PORT, () => {
  console.log(`Aplicação a rodar na porta ${PORT}.`);
});
