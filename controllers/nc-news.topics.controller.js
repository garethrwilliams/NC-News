const models = require('../models');

exports.getTopics = (req, res, next) => {
  models.topics
    .selectTopics()
    .then((topics) => {
      res.status(200).send({topics});
    })
    .catch(next);
};

exports.postTopics = async (req, res, next) => {
  try {
    const new_topic = req.body;

    const topic = await models.topics.insertTopic(new_topic);

    res.status(201).send({topic});
  } catch (err) {
    next(err);
  }
};
