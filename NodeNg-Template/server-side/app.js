var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors'); // for CORS (!)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
var thingsJwtRouter = require('./routes/things_jwt'); // 'Things' route using JWT Login/Token
var thingsGenRouter = require('./routes/things_gen'); // Generic 'Things' route

var app = express();
// app.use(cors()); // use CORS when necessary(!)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('things_jwt', thingsJwtRouter); // 'Things' route using JWT
app.use('things_gen', thingsGenRouter); // Generic 'Things' route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
