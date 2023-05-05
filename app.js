const express = require('express');

const mongoose = require('mongoose');

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

app.use((req, res, next) => {
  req.user = {
    _id: '64539dc71142eabf2fa0e610',
  };
  next();
});
app.use('/', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
