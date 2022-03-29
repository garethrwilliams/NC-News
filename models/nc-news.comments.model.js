const db = require('../db/connection');
const format = require('pg-format');
const models = require('./index');

exports.insertComment = async (articleId, newComment) => {
  const {username, body} = newComment;

  if (!body) {
    return Promise.reject({code: 400, error: 'Please provide a comment'});
  }

  const validUsernames = await (
    await models.users.selectUsers()
  ).map((e) => e.username);

  if (!validUsernames.includes(username)) {
    return Promise.reject({
      code: 400,
      error: 'Please provide a valid username',
    });
  }

  await models.articles.selectArticleById(articleId);

  const sql = `INSERT INTO comments (body, article_id, author)
    VALUES ($1, $2, $3)
    RETURNING body`;
  const values = [body, articleId, username];

  const comment = await db.query(sql, values);

  return comment.rows[0];
};
