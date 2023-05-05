const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные." });
      } if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Пользователь по указанному _id не найден." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError"){
        return res.status(400).send({ message: "Переданы некорректные данные при создании пользователя." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля." });
      } else {
        return res.status(500).send({ message: err.message });
      };
  });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    {
      avatar
    },
    {
      new: true,
      runValidators: true,
    })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара." });
      } else {
        return res.status(500).send({ message: err.message });
      };
  });
};