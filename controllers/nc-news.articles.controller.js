const models = require('../models');

exports.getArticle = async (req, res, next) => {
  try {
    const {sort_by, order, topic, limit, p} = req.query;

    const articles = await models.articles.selectArticles(
      sort_by,
      order,
      topic,
      limit,
      p
    );

    res.status(200).send({articles});
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = (req, res, next) => {
  const {article_id} = req.params;
  models.articles
    .selectArticleById(article_id)
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

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const {limit, p} = req.query;

    const comments = await models.articles.selectCommentsByArticleId(
      article_id,
      limit,
      p
    );

    res.status(200).send({comments});
  } catch (err) {
    next(err);
  }
};

exports.postArticle = async (req, res, next) => {
  try {
    const new_article = req.body;

    const article = await models.articles.insertArticle(new_article);

    res.status(201).send({article});
  } catch (err) {
    next(err);
  }
};
