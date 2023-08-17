const express = require(`express`);
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/toursRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const golbalErrorhandler = require('./controllers/errorController');

//1). middle ware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// app.use((req, res, next) => {
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//3). routes

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//middleware handler error
app.use(golbalErrorhandler);
//0). Start the server
module.exports = app;
