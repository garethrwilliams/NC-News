const express = require('express');
const app = express();
const errorHandlers = require('./error-handlers');
const controllers = require('./controllers/nc-news.controller.js');

app.use(express.json());

// Topics
app.get('/api/topics', controllers.getTopics);

// Articles
app.get('/api/articles/:article_id', controllers.getArticleById);
app.patch('/api/articles/:article_id', controllers.patchArticleById);

const {getTopics} = require('./controllers/nc-news.controller');

app.use(express.json());

app.get('/api/topics', getTopics);

app.all('/*', (req, res, next) => {
  res.status(404).send({error: 'Path not found'});
});

// Error handlers
app.use(errorHandlers.customError);
app.use(errorHandlers.serverError);

module.exports = app;
