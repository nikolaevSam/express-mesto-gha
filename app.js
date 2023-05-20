const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const auth = require('./middlewares/auth');
const router = require('./routes/router');
const { login, createUser } = require('./controllers/users');
const { createUserValidation, loginValidation } = require('./middlewares/validation');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const {
  PORT = 3000,
  URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(URL);

app.use(helmet());
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.use(auth);
app.use('/', router);

app.use(errors({ message: 'Ошибка валидации Joi!' }));

app.use((error, req, res, next) => {
  const {
    status = HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message,
  } = error;
  res.status(status).send({
    message: status === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });
  next();
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
