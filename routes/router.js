const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => next(NotFoundError('Not found')));

module.exports = router;
