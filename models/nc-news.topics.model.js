const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = async () => {
  const sql = `SELECT * FROM topics`;

  const topics = await db.query(sql);
  return topics.rows;
};
