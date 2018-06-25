const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING);

module.exports = Users = sequelize.define('Users', {
   id: {
     type: Sequelize.INTEGER,
     primaryKey: true,
     unique: true,
     autoIncrement: true,
   },
   username: {
     type:  Sequelize.STRING,
     unique: true,
     unique: true,
   },
   password: Sequelize.STRING,
 }, {
     hooks: {
       beforeCreate: async(user) => {
         const salt = await bcrypt.genSalt(10);
         const passwordHash = await bcrypt.hash(user.password, salt);
         user.password = passwordHash;
       }
     }
   });

