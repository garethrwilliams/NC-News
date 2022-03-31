const topicsRouter = require('express').Router();
const controllers = require('../controllers');

topicsRouter.get('/', controllers.topics.getTopics);

module.exports = topicsRouter;
