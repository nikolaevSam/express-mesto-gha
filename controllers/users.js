const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "SomeError") {
        return re.status(400).send({ message: "Переданы некорректные данные." });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Пользователь по указанному _id не найден." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError"){
        res.status(404).send({ message: "Переданы некорректные данные при создании пользователя." });
      } else {
        return res.status(500).send({ message: err.message });
      };
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "SomeError" || err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля." });
      } else {
        return res.status(500).send({ message: err.message });
      };
  });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "SomeError" || err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара." });
      } else {
        return res.status(500).send({ message: err.message });
      };
  });
};