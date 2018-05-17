var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// var sequelize = require('../models');
const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING);

var Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  });

// var Users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.send('login');
});

router.get('/register', function (req, res, next) {
  res.send('register');
});

passport.use(new LocalStrategy(
  function (username, password, done) {
   
    Users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', { succesRedirect: '/', failureRedirect: '/users', failureFlash: true }),
  function (req, res) {
    res.redirect('/');
  });

router.post('/register', function (req, res, next) {
  //  Users.create({ username: req.body.username, password: req.body.password })
  //   .then(() => User.findOrCreate({ where: { username: req.body.username }, defaults: { password: 'something else' } }))
  //   .spread((user, created) => {
  //     console.log(user.get({
  //       plain: true
  //     }))
  //     console.log(created)
  //   });

  // Users.associate = function (models) {
  //   // associations can be defined here
  // };
  // Users.beforeCreate((newUser, options) => {
  //   return bcrypt.genSalt(10, function (err, salt) {
  //     if(err) console.log(err);
  //     bcrypt.hash(newUser.password, salt, function (err, hash) {
  //       if(err) console.log(error);
  //       newUser.password = hash;
  //     });
  //   });
  // });
  

  sequelize.sync({
    force: true,
  }).then(() => {
    Users.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => {
      res.json(user);
    })
  })


  // debugger;
  // // if (config.use_env_variable) {
  //   // var sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // // } else {
  //   // var sequelize = new Sequelize(config.database, config.username, config.password, config);
  // // }
  // fs
  //   .readdirSync(__dirname)
  //   .filter(file => {
  //     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  //   })
  //   .forEach(file => {
  //     var model = sequelize['import'](path.join(__dirname, file));
  //     db[model.name] = model;
  //   });
  //   debugger;

  // Object.keys(db).forEach(modelName => {
  //   if (db[modelName].associate) {
  //     db[modelName].associate(db);
  //   }
  // });
  // debugger;

  // db.sequelize = sequelize;
  // db.Sequelize = Sequelize;
});

module.exports = router;
