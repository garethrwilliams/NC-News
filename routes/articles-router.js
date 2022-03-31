const articlesRouter = require('express').Router();
const controllers = require('../controllers');

articlesRouter.route('/').get(controllers.articles.getArticle);
// .post(controllers.articles.postArticle);

articlesRouter
  .route('/:article_id')
  .get(controllers.articles.getArticleById)
  .patch(controllers.articles.patchArticleById);

articlesRouter
  .route('/:article_id/comments')
  .get(controllers.articles.getCommentsByArticleId)
  .post(controllers.comments.postComment);

module.exports = articlesRouter;
