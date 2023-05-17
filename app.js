const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');

const helmet = require('helmet');

const {
  PORT = 3000,
  URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

app.use(bodyParser.json());

app.use(helmet());

mongoose.connect(URL);

app.use('/', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
