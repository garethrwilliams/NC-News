const express = require('express');
const app = express();
const errorHandlers = require('./error-handlers');
const apiRouter = require('./routes/api-router');

app.use(express.json());

app.use('/api', apiRouter);

// Endpoints
app.get('/api', (req, res) => res.json({endpoints}));

app.all('/*', (req, res, next) => {
  res.status(404).send({error: 'Path not found'});
});

// Error handlers
app.use(errorHandlers.psqlError);
app.use(errorHandlers.customError);
app.use(errorHandlers.serverError);

module.exports = app;
