const usersRouter = require('express').Router();
const
  {
    login,
    getUsers,
    getUser,
    getUserById,
    createUser,
    updateUser,
    updateAvatar,
  } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
