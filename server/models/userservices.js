'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserServices = sequelize.define('UserServices', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  UserServices.associate = function(models) {
    // associations can be defined here
  };
  return UserServices;
};