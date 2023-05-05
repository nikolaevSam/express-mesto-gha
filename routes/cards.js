const cardsRouter = require('express').Router();
const
  {
    getCards,
    createCard,
    deleteCardById,
    likeCard,
    dislikeCard,
  } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
