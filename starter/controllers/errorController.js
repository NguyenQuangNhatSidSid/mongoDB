module.exports = (err, req, res, next) => {
  //console.log(err.stack); //stackTrace show us where the error happen
  //conaskdn,asnd
  //jajcsbjasbkdkjasd
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
};

