const db = require('../db/connection');
const format = require('pg-format');

exports.selectUsers = async () => {
  const sql = `SELECT username FROM users`;

  const users = await db.query(sql);

  return users.rows;
};

exports.selectUsersByUsername = async (username) => {
  const sql = `SELECT * FROM users WHERE username = $1`;

  const user = await db.query(sql, [username]);

  if (user.rows.length === 0) {
    return Promise.reject({code: 404, error: 'Username not found'});
  }

  return user.rows[0];
};
