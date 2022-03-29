const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = async () => {
  const sql = `SELECT * FROM topics`;

  const topics = await db.query(sql);
  return topics.rows;
};

exports.selectArticleById = async (articleId) => {
  const sql = `SELECT name AS author, COUNT(comments.body) AS comment_count ,title, articles.article_id, articles.body, topic, articles.created_at, articles.votes
  FROM articles 
  JOIN users ON articles.author = users.username
  JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id, name, title, articles.article_id, articles.body, topic, articles.created_at, articles.votes;`;

  const article = await db.query(sql, [articleId]);

  if (article.rows.length === 0) {
    return Promise.reject({code: 404, error: 'Article not found'});
  }

  return article.rows[0];
};

exports.updateArticleById = async (articleId, inc_vote) => {
  const sql1 = `SELECT votes FROM articles WHERE article_id = $1;`;

  let votes = await db.query(sql1, [articleId]);
  if (votes.rows.length === 0) {
    return Promise.reject({code: 404, error: 'Article not found'});
  }

  votes = votes.rows[0];
  votes.votes += inc_vote;

  const sql2 = `UPDATE articles SET votes = $1 WHERE article_id = $2;`;
  await db.query(sql2, [votes.votes, articleId]);

  const sql3 = `SELECT name AS author, title, article_id, body, topic, created_at, votes
  FROM articles 
  JOIN users ON articles.author = users.username
  WHERE article_id = $1;`;
  const article = await db.query(sql3, [articleId]);

  return article.rows[0];
};
