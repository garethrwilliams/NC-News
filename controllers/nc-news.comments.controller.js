const models = require('../models');

exports.postComment = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const new_comment = req.body;

    const comment = await models.comments.insertComment(
      article_id,
      new_comment
    );

    res.status(201).send({comment});
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const {comment_id} = req.params;

    await models.comments.removeComment(comment_id);

    res.status(204).send({});
  } catch (err) {
    next(err);
  }
};
