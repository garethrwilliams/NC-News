const models = require('../models/nc-news.model.js');

exports.getTopics = (req, res, next) => {
  models
    .selectTopics()
    .then((topics) => {
      res.status(200).send({topics});
    })
    .catch(next);
};

exports.getArticleById = async (req, res, next) => {
  const articleId = +req.params.article_id;
  try {
    const article = await models.selectArticleById(articleId);
    res.status(200).send({article});
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  const articleId = +req.params.article_id;
  const {inc_vote} = req.body;

  if (!inc_vote) {
    return next({code: 400, error: 'Please provide vote information'});
  }
  try {
    const article = await models.updateArticleById(articleId, inc_vote);
    res.status(200).send({article});
  } catch (err) {
    next(err);
  }
};
