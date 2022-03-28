const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = async () => {
  const sql = `SELECT * FROM topics`;

  const topics = await db.query(sql);
  return topics.rows;
};

exports.selectArticleById = async (articleId) => {
  const sql = `SELECT name AS author, title, article_id, body, topic, created_at, votes
  FROM articles 
  JOIN users ON articles.author = users.username
  WHERE article_id = $1;`;

  const article = await db.query(sql, [articleId]);

  if (article.rows.length === 0) {
    return Promise.reject({code: 400, error: 'Bad request'});
  }

  return article.rows[0];
};
