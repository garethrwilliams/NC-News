const models = require('../models/');

exports.getArticle = async (req, res, next) => {
  try {
    const articles = await models.articles.selectArticle();

    res.status(200).send({articles});
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = (req, res, next) => {
  const articleId = +req.params.article_id;
  models.articles
    .selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch(next);
};

exports.patchArticleById = async (req, res, next) => {
  const articleId = +req.params.article_id;
  const {inc_vote} = req.body;

  if (!inc_vote) {
    return next({code: 400, error: 'Please provide vote information'});
  }
  try {
    const article = await models.articles.updateArticleById(
      articleId,
      inc_vote
    );
    res.status(200).send({article});
  } catch (err) {
    next(err);
  }
};
