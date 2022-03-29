const express = require('express');
const app = express();
const errorHandlers = require('./error-handlers');
const controllers = {};
controllers.topics = require('./controllers/nc-news.topics.controller.js');
controllers.articles = require('./controllers/nc-news.articles.controller.js');

app.use(express.json());

// Topics
app.get('/api/topics', controllers.topics.getTopics);

// Articles
app.get('/api/articles/:article_id', controllers.articles.getArticleById);

app.all('/*', (req, res, next) => {
  res.status(404).send({error: 'Path not found'});
});

// Error handlers
app.use(errorHandlers.psqlError);
app.use(errorHandlers.customError);
app.use(errorHandlers.serverError);

module.exports = app;
