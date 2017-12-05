'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    aboutme: DataTypes.STRING,
    talents: DataTypes.STRING,
    favorites: DataTypes.STRING,
    whymessage: DataTypes.STRING,
    gender: DataTypes.STRING,
    martial: DataTypes.STRING,
    height: DataTypes.INTEGER,
    body: DataTypes.STRING,
    children: DataTypes.INTEGER,
    occupation: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  Profile.associate = function(models) {
    // associations can be defined here
    Profile.hasOne(models.User, {
      foreignKey: 'profileId'
    });
  };

  return Profile;
};
