const models = require('../models');

exports.postComment = async (req, res, next) => {
  try {
    const articleId = +req.params.article_id;
    const newComment = req.body;

    const comment = await models.comments.insertComment(articleId, newComment);

    res.status(201).send({comment});
  } catch (err) {
    next(err);
  }
};
