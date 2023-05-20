const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } return next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if ((card.owner).toString() !== req.user._id) {
        return next(new ForbiddenError('Карточку невозможно удалить.'));
      } return res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы некорректные данные.'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Карточке поставлен лайк' }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы некорректные данные.'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then(() => res.status(HTTP_STATUS_OK).send({ message: 'У карточки удален лайк' }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Карточка по указанному _id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы некорректные данные.'));
      }
      return next(err);
    });
};
