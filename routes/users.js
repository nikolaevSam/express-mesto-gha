const usersRouter = require('express').Router();

const
  {
    getUsers,
    getUser,
    getUserById,
    updateUser,
    updateAvatar,
  } = require('../controllers/users');

const
  {
    userIdValidation,
    updateUserValidation,
    updateAvatarValidation,
  } = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', userIdValidation, getUser);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateUserValidation, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
