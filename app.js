var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var cors = require('cors')
var passport = require('./src/service/passport');
var authService = require('./src/service/auth');
var router = express.Router();
var app = express();

var pathService = './routes';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  authService.setUserProfile(req);
  next();
});

fs.readdir(pathService, (err, files) => {
  files.forEach((file) => {
    const extension = path.extname(file)
    const fileName = path.basename(file, extension);
    if (fileName !== 'auth') {
      router.use(`/${fileName}`, passport.authentication, require(`${pathService}/${fileName}`));
    } else {
      router.use(`/${fileName}`, require(`${pathService}/${fileName}`));
    }
  });
});

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;