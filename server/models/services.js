'use strict';
module.exports = (sequelize, DataTypes) => {
  var Services = sequelize.define('Services', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Services.associate = function(models) {
    // associations can be defined here
  };
  return Services;
};