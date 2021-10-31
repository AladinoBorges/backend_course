require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;

const controllers = require('./controllers');
const routers = require('./routes');

const app = express();

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/uploads'));

app.get('/ping', controllers.ping);

app.use('/files', routers.saveFile);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
