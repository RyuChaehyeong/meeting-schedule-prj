var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var sequelize = require('./models').sequelize;
const passportConfig = require('./passport');
require('dotenv').config();
var app = express();

const Schedule = require('./schedule/scheduleJob');
let schedule = new Schedule();
schedule.startBackup();
schedule.noticeMeetEnd();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

require('./config/firebase-init');

//database 연결
sequelize.sync();


app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
  
  
  //body-parser
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({extended: true}));
  
  
  //express-session
  app.use(cookieParser());
  app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: 'secret-code',
      cookie: {
          httpOnly: true,
          secure: false
        }
  }));
      
      
  app.use(passport.initialize());
  app.use(passport.session());
  passportConfig(passport);
  app.use(flash());
  
  require('./routes/index')(app);
  
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
  

  