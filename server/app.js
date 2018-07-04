const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const logger = require('morgan');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pg = require('pg');
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const httpStrategy = require('passport-http').Strategy;
const cors =  require('cors');

app.use(cors());

//---------------------------------------------ROUTES
const index = require('./routes/index');
const users = require('./routes/users');
const task = require('./routes/task');
const tasks = require('./routes/tasks');

//---------------------------------------------MONGOOSE CONNECTION
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + process.env.MONGO_CONNECTION_STRING);
});

mongoose.connection.on('error', (err) => {
  console.log('database error:' + err);
});

const connection = mongoose.connection;

//---------------------------------------------SEQUALIZE
const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING);
sequelize.Promise = global.Promise;

sequelize
.authenticate()
.then(() => {
  console.log('Connection to postgres has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//---------------------------------------------Express Session
app.use(session({
  secret: 'secret',
  saveUninitiazized: true,
  resave: true,
}));

//---------------------------------------------Passport init
app.use(passport.initialize());
app.use(passport.session());

//---------------------------------------------Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//---------------------------------------------Connect Flash
app.use(flash());

//---------------------------------------------Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use('/task', task);
app.use('/tasks', tasks);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;
