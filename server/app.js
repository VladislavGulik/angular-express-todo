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
const Sequelize = require('sequelize');
const config = require('./config/database');
const dotenv = require('dotenv').config();
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const httpStrategy = require('passport-http').Strategy;

//---------------------------------------------ROUTES
const index = require('./routes/index');
const users = require('./routes/users');
const task = require('./routes/task');

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

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//---------------------------------------------PG POSTGRES MIGRATION
// const client = new pg.Client(process.env.POSTGRES_CONNECTION_STRING);

// client.connect(async(err) => {
//   if(err) return console.error('could not connect to postgres', err);
//   await client.query('SELECT NOW() AS "theTime"', (err, result) => {
//     if(err) return console.error('error running query', err);
//     console.log(`Connected to postgres database ${result.rows[0].theTime}`);
//   });
//   await client.query(`CREATE TABLE users(
//       id SERIAL PRIMARY KEY,
//       username TEXT NOT NULL,
//       password TEXT NOT NULL
//   );
//   CREATE TABLE services(
//       id SERIAL PRIMARY KEY,
//       service_name TEXT NOT NULL,
//       hosting BOOLEAN NULL DEFAULT false,
//       cloud BOOLEAN NULL DEFAULT false,
//       analytics BOOLEAN NULL DEFAULT false
//   );`, (err, result) => {
//       if (err) return console.log(err);
//   });
//   await client.query(`CREATE TABLE user_services(
//     id SERIAL,
//     user_id INTEGER REFERENCES users ON DELETE RESTRICT,    
//     service_id INTEGER REFERENCES services ON DELETE CASCADE,
//     PRIMARY KEY (id, user_id, service_id)
//   );`, (err, result) => {
//     if(err) return console.log(err);
//   });
//   //JOIN
//   //select * from user_services INNER JOIN Services ON (user_services.id = Services.id) where user_services.id = 1
// });

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
