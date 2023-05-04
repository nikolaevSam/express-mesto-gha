const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании карточки." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка по указанному _id не найден." });
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "SomeError") {
        return re.status(400).send({ message: "Переданы некорректные данные." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий _id карточки." });
      } else {
        return res.status(200).send(card);
      };
    })
    .catch((err) => {
      if (err.name === "SomeError" || err.name === "ValidationError") {
        return re.status(400).send({ message: "Переданы некорректные данные для снятии лайка." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Передан несуществующий _id карточки." });
      } else {
        return res.status(200).send(card);
      };
    })
    .catch((err) => {
      if (err.name === "SomeError" || err.name === "ValidationError") {
        return re.status(400).send({ message: "Переданы некорректные данные для снятии лайка." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};