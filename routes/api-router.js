const apiRouter = require('express').Router();
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require('./topics-router');
const usersRouter = require('./users-router');
const endpoints = require('../endpoints.json');

// Articles
apiRouter.use('/articles', articlesRouter);

// Topics
apiRouter.use('/topics', topicsRouter);

// Comments
apiRouter.use('/comments', commentsRouter);

// Users
apiRouter.use('/users', usersRouter);

// Endpoint
apiRouter.get('/', (req, res) => res.json({endpoints}));

module.exports = apiRouter;
