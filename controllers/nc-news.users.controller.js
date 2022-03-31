const models = require('../models');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await models.users.selectUsers();

    res.status(200).send({users});
  } catch (err) {
    next(err);
  }
};
exports.getUsersByUsername = async (req, res, next) => {
  try {
    const {username} = req.params;

    const user = await models.users.selectUsersByUsername(username);

    res.status(200).send({user});
  } catch (err) {
    next(err);
  }
};
