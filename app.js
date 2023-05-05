const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  PORT = 3000,
  URL = 'mongodb://localhost:27017/mestodb'
} = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "64539dc71142eabf2fa0e610"
  };
  next();
});

app.use(bodyParser.json());

mongoose.connect(URL);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});