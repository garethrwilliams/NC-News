const commentsRouter = require('express').Router();
const controllers = require('../controllers');

commentsRouter.delete('/:comment_id', controllers.comments.deleteComment);

module.exports = commentsRouter;
