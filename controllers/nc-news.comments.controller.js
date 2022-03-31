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

exports.patchCommentById = async (req, res, next) => {
  try {
    const {inc_vote} = req.body;
    const {comment_id} = req.params;

    if (!inc_vote) {
      return next({code: 400, error: 'Please provide vote information'});
    }

    const comment = await models.comments.updateCommentById(
      inc_vote,
      comment_id
    );

    res.status(200).send({comment});
  } catch (err) {
    next(err);
  }
};
