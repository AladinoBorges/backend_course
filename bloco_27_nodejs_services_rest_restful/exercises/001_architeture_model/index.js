const express = require('express');

const app = express();
app.use(express.json());

const UserRoutes = require('./routes/UserRoutes');

app.use('/users', UserRoutes);

const PORT = process.env.PORT || 3000;

app.all('*', function (_request, _response, next) {
  return next({ code: 'notFound', message: 'Acho que não vi um passarinho, não vi, não vi!' });
});

const ErrorsMiddleware = require('./middlewares/ErrorsMiddleware');

app.use(ErrorsMiddleware);

app.listen(PORT, function () {
  console.log(`Aplicação a rodar na porta ${PORT}`);
});
