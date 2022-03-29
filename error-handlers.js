exports.customError = (err, req, res, next) => {
  // console.log(err);
  const notFound = [404];
  if (notFound.includes(err.code)) {
    res.status(404).send({error: err.error});
  } else {
    next(err);
  }
};

exports.psqlError = (err, req, res, next) => {
  // console.log(err);
  const badRequest = ['22P02'];
  if (badRequest.includes(err.code)) {
    res.status(400).send({error: 'Bad request'});
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  console.log('server err:', err);
  res.status(500).send({error: 'Internal server error'});
};
