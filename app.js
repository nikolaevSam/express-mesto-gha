const express = require('express');

const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const
  {
    login,
    createUser,
  } = require('./controllers/users');
const
  {
    createUserValidation,
    loginValidation,
  } = require('./middlewares/validation');

const {
  PORT = 3000,
  URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

app.use(express.json());
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors());

app.use(helmet());

mongoose.connect(URL);

app.use('/', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
