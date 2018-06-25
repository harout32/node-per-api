//adding the enviroment variables
require('dotenv').config({ path: 'variables.env'});

const mongoose = require('mongoose');

//connecting to the DB and Promiseifying it
mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

const app = require('./server/app');

app.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
})
