const db = require('../db/connection');
const format = require('pg-format');

exports.selectUsers = async () => {
  const sql = `SELECT username FROM users`;

  const users = await db.query(sql);

  return users.rows;
};
