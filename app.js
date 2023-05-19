const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/router');
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

const app = express();

const {
  PORT = 3000,
  URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(URL);

app.use(helmet());
app.use(express.json());
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.use(auth);
app.use(router);
app.use(errors());

app.use((error, req, res, next) => {
  const {
    status = 500,
    message,
  } = error;
  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
