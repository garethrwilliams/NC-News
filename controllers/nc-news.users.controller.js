const models = require('../models');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await models.users.selectUsers();

    res.status(200).send({users});
  } catch (err) {
    next(err);
  }
};
