const usersRouter = require('express').Router();
const
  {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateAvatar,
    login,
  } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
