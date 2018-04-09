'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserCreate = sequelize.define('UserCreate', {
    email: DataTypes.STRING
  }, {});
  UserCreate.associate = function(models) {
    // associations can be defined here
  };
  return UserCreate;
};