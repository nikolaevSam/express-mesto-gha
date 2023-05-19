const cardsRouter = require('express').Router();

const
  {
    getCards,
    createCard,
    deleteCardById,
    likeCard,
    dislikeCard,
  } = require('../controllers/cards');

const
  {
    createCardValidation,
    cardIdValidation,
  } = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', cardIdValidation, deleteCardById);
cardsRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRouter;
