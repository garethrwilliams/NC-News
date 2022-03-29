const models = {};
models.articles = require('../models/nc-news.articles.model.js');
models.topics = require('../models/nc-news.topics.model.js');

exports.getArticleById = (req, res, next) => {
  const articleId = +req.params.article_id;
  models.articles
    .selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch(next);
};
