const usersRouter = require('express').Router();
const controllers = require('../controllers/');

usersRouter.get('/', controllers.users.getUsers);
usersRouter.get('/:username', controllers.users.getUsersByUsername);

module.exports = usersRouter;
