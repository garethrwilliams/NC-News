const models = require('../models/nc-news.model.js');

exports.getTopics = (req, res, next) => {
  models
    .selectTopics()
    .then((topics) => {
      res.status(200).send({topics});
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const articleId = +req.params.article_id;
  models
    .selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const articleId = +req.params.article_id;
  const {inc_vote} = req.body;

  if (!inc_vote) {
    return next({code: 400, error: 'Please provide vote information'});
  }

  models
    .updateArticleById(articleId, inc_vote)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch(next);
};
