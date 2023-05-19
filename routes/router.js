const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');

const
  {
    login,
    createUser,
  } = require('../controllers/users');

const
  {
    createUserValidation,
    loginValidation,
  } = require('../middlewares/validation');

router.post('/signup', loginValidation, createUser);
router.post('/signin', createUserValidation, login);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  res.status(404)
    .send({ message: '404: Not Found' });
});

module.exports = router;
