jest.setTimeout(30000);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node_redis', {
   useMongoClient: true
});
