exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(err => next(err));
  }
};

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err)
}

exports.apiHandle = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    status: err.status
  }
  // res.status(err.status || 500);
  // // based on accept http header
  // res.format({
  //   'text/html': () => {
  //     res.render('error',errorDetails);
  //   },
  //   'application/json': () => res.json(errorDetails)
  // })
  res.status(err.status || 500).json(errorDetails);
}