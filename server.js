const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('./utils/cache');

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose.Promise = require('bluebird');

mongoose
   .connect(process.env.DATABASE_LOCAL, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useMongoClient: true,
   })
   .then(() => {
      console.log('Database connection successful');
   });

const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () => {
   console.log(`App running on port ${port}...`);
});
