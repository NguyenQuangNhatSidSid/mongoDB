const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfull'));

//create a new Tour
// const testTour = new Tour({
//   name: 'The Forest',
//   price: 999,
// });
//Save Tour
// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(error => console.log('ERROR: ', error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});

//Test
