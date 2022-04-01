const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = async () => {
  const sql = `SELECT * FROM topics`;

  const topics = await db.query(sql);
  return topics.rows;
};

exports.insertTopic = async (new_topic) => {
  const {slug, description} = new_topic;

  if (!slug || !description) {
    return Promise.reject({
      code: 400,
      error:
        'Please provide a slug and description in order to submit a valid topic',
    });
  }

  const sql = `INSERT INTO topics (slug, description)
  VALUES ($1, $2) RETURNING *`;

  const topic = await db.query(sql, [slug, description]);

  return topic.rows[0];
};
