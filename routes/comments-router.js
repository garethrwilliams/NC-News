const commentsRouter = require('express').Router();
const controllers = require('../controllers');

commentsRouter.delete('/:comment_id', controllers.comments.deleteComment);

commentsRouter.patch('/:comment_id', controllers.comments.patchCommentById);

module.exports = commentsRouter;
