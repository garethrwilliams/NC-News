const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = () => {
  const sql = `SELECT * FROM topics`;

  return db.query(sql).then((topics) => {
    return topics.rows;
  });
};
