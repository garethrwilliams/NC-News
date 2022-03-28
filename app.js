const express = require('express');
const app = express();

const {getTopics} = require('./controllers/nc-news.controller');

app.use(express.json());

app.get('/api/topics', getTopics);

app.all('/*', (req, res, next) => {
  res.status(404).send({error: 'Path not found'});
});

app.use((err, req, res, next) => {
  console.log('server err:', err);
  res.status(500).send({error: 'Internal server error'});
});

module.exports = app;
