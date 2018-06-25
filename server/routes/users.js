const router = require('express-promise-router')();
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const UsersController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../passport');
const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING);

const Users = sequelize.define('Users', {
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

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UsersController.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',
  passport.authenticate('local', { succesRedirect: '/', failureRedirect: '/users', failureFlash: true }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router;
