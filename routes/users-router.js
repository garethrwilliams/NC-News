const usersRouter = require('express').Router();
const controllers = require('../controllers/');

usersRouter.get('/', controllers.users.getUsers);

module.exports = usersRouter;
