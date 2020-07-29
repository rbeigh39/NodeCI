const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const viewsRouter = require('./routes/viewRoutes');

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
   console.log('Request recieved!');
   next();
});

app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Origin', req.headers.origin);
   res.header(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
   );
   res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
   );
   next();
});

// app.use((req, res, next) => {
//    console.log('request arrived');
//    next();
// });

app.use('/', viewsRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
