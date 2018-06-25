const JWT = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Users = require('../models/users');
const { JWT_SECRET } = require('../config/index');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING);

signToken = user => {
    const date = new Date;
    return JWT.sign({
        iss: 'Angular-Express-App',
        sub: user.id,
        iat: date.getTime(), 
        exp: date.setDate(date.getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async(req, res, next) => {       
        const { username, password } = await req.value.body;
        const foundUser = await Users.findOne({ where: { username }, raw: true });
        if(foundUser) {
            return res.status(403).json({ error: 'User is already exist' });
        } 
        sequelize.sync({
            force: true,
        }).then(() => {
            Users.create({
                username: req.body.username,
                password: req.body.password,
            }).then((user) => {
                const token = signToken(user);
                res.status(200).json({ token });
            })
        })
    },
    signIn: (req, res, next) => {
        sequelize.sync({
            force: true,
        }).then((user) => {
            console.log('LOGIN');
            const token = signToken(req.user);
            res.status(200).json({ token });
        })
    },
    secret: (req, res, next) => {
        console.log('SECRET');
        res.json({ secret: "resource" });
    }
}