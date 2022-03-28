exports.customError = (err, req, res, next) => {
  console.log(err);
  const badRequests = [400];
  if (badRequests.includes(err.code)) {
    res.status(400).send({error: err.error});
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  console.log('server err:', err);
  res.status(500).send({error: 'Internal server error'});
};
