const models = {};
models.articles = require('../models/nc-news.articles.model.js');
models.topics = require('../models/nc-news.topics.model.js');

exports.getTopics = (req, res, next) => {
  models.topics
    .selectTopics()
    .then((topics) => {
      res.status(200).send({topics});
    })
    .catch(next);
};
