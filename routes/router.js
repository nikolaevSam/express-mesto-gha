const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', () => {
  throw new NotFoundError('Not Found');
});

module.exports = router;
