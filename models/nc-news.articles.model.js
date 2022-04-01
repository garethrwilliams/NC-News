const db = require('../db/connection');
const format = require('pg-format');
const models = require('./index');

exports.selectArticles = async (
  sort_by = 'created_at',
  order = 'DESC',
  topic,
  limit = 10,
  p = 1
) => {
  const topics = await db.query(`SELECT DISTINCT topic FROM articles;`);
  const topicsArr = topics.rows.map((e) => e.topic);

  if (topic !== undefined && !topicsArr.includes(topic)) {
    return Promise.reject({code: 404, error: 'Topic does not exist'});
  }

  if (
    ![
      'author',
      'title',
      'article_id',
      'topic',
      'created_at',
      'votes',
      'comment_count',
    ].includes(sort_by)
  ) {
    return Promise.reject({code: 404, error: 'Sort_by field does not exist'});
  }

  let i = 0;

  let sql = `SELECT name AS author, COUNT(comments.body) ::int AS comment_count ,title, articles.article_id, articles.body, topic, articles.created_at, articles.votes
  FROM articles 
  JOIN users ON articles.author = users.username
  LEFT JOIN comments ON comments.article_id = articles.article_id`;

  const values = [];

  if (topic) {
    sql += ` WHERE topic = $${++i}`;
    values.push(topic);
  }

  sql += ` GROUP BY articles.article_id, name`;

  const sqlFormat = format(` ORDER BY %1$s %2$s`, sort_by, order);
  sql += sqlFormat;

  sql += ` LIMIT $${++i} OFFSET $${++i};`;
  values.push(limit);
  values.push(limit * (p - 1));

  const articles = await db.query(sql, values);

  if (articles.rows.length === 0) {
    return Promise.reject({code: 404, error: 'There are no further articles'});
  }

  return articles.rows;
};

exports.selectArticleById = async (articleId) => {
  const sql = `SELECT users.username AS author, COUNT(comments.body) ::int AS comment_count ,title, articles.article_id, articles.body, topic, articles.created_at, articles.votes
  FROM articles 
  JOIN users ON articles.author = users.username
  LEFT JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id, users.username;`;

  const article = await db.query(sql, [articleId]);

  if (article.rows.length === 0) {
    return Promise.reject({code: 404, error: 'Article not found'});
  }

  return article.rows[0];
};

exports.selectCommentsByArticleId = async (article_id, limit = 10, p = 1) => {
  const sql = `SELECT comment_id, comments.votes, comments.created_at, users.username, comments.body
  FROM comments
  LEFT JOIN articles ON comments.article_id = articles.article_id
  LEFT JOIN users ON articles.author = users.username
  WHERE articles.article_id = $1
  lIMIT $2 OFFSET $3;`;

  const values = [article_id, limit, limit * (p - 1)];

  const commentsDbQuery = db.query(sql, values);
  const articleDbQuery = this.selectArticleById(article_id);

  const comments = await Promise.all([commentsDbQuery, articleDbQuery]);

  if (comments[0].rows.length === 0 && p > 1) {
    return Promise.reject({code: 404, error: 'There are no further comments'});
  }

  return comments[0].rows;
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

exports.insertArticle = async (new_article) => {
  const {author, title, body, topic} = new_article;

  if (!author || !title || !body || !topic) {
    return Promise.reject({
      code: 400,
      error:
        'Please provide an author, title, body and topic in order to submit a valid article',
    });
  }

  const validUsernames = await (
    await models.users.selectUsers()
  ).map((e) => e.username);

  if (!validUsernames.includes(author)) {
    return Promise.reject({
      code: 400,
      error: 'Please provide a valid author',
    });
  }

  const sql = `INSERT INTO articles (author, title, body, topic)
  VALUES ($1, $2, $3, $4)
  RETURNING article_id;`;
  const values = [author, title, body, topic];

  let article_id = await db.query(sql, values);

  article_id = article_id.rows[0].article_id;

  const article = await this.selectArticleById(article_id);

  return article;
};

exports.removeArticleById = async (article_id) => {
  const sql = `
  DELETE FROM articles WHERE article_id = $1 RETURNING *;`;

  const deletedArticle = await db.query(sql, [article_id]);

  if (deletedArticle.rows.length === 0) {
    return Promise.reject({code: 404, error: 'Article not found'});
  }
};
