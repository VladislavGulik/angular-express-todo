const passport = require('passport');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/index'); 
const Users = require('./models/users');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        const user = await Users.findById(payload.sub);
        if(!user) {
            return done(null, false);
        } 
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await Users.findOne({ where: { username }, raw: true});
        if(!user) {
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);        
    }
}));