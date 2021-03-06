var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var exphbs = require('express-handlebars');
var passport = require('passport')
var flash = require('connect-flash')
var _ = require('underscore')

var routes = require('./routes/index');

var app = express();
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: _.extend({},
        require('./middleware/validation/helpers'))
})

// view engine setup
app.engine('hbs', hbs.engine);
  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('keyboard cat'));

app.use(session({ 
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}))

app.use(flash())

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/validation'))
app.use(require('./middleware/flash'))

app.use(passport.initialize())
app.use(passport.session())

require('./passport')

app.use('/', routes);
app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/signup'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
