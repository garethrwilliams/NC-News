const topicsRouter = require('express').Router();
const controllers = require('../controllers');

topicsRouter
  .route('/')
  .get(controllers.topics.getTopics)
  .post(controllers.topics.postTopics);

module.exports = topicsRouter;
