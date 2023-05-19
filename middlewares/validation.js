const { Joi, celebrate } = require('celebrate');

const isURL = require('validator/lib/isURL');

const BadRequestError = require('../errors/BadRequestError');

const urlValidation = (url) => {
  if (isURL(url)) {
    return url;
  } return BadRequestError('Некорректный URL.');
};

const idValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) {
    return id;
  } return BadRequestError('Некорректный id');
};

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.custom(urlValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.custom(urlValidation).required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(idValidation).required(),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(urlValidation).required(),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(idValidation).required(),
  }),
});
