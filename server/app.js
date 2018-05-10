const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pg = require('pg');
const config = require('./config/database');
const dotenv = require('dotenv').config();

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

//---------------------------------------------POSTGRES CONNECTION
const client = new pg.Client(process.env.POSTGRES_CONNECTION_STRING);

client.connect((err) => {
  if(err) return console.error('could not connect to postgres', err);
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if(err) return console.error('error running query', err);
    console.log(`Connected to postgres database ${result.rows[0].theTime}`);
    client.end();
  });
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/task', task);
app.use('/tasks', tasks);

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
