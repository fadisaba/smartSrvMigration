"use strict";
module.exports = function(sequelize, DataTypes) {
  var UserCat = sequelize.define("UserCat", {
    userCatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userCatName: {
      type: DataTypes.STRING,
      allowNull: false
    },
      userCatSchColor: { // the color on the Resources scheduler
          type: DataTypes.STRING,
          allowNull: true
      },
    userCatReadOnly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
      }, {
        tableName: 'user_cat',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            UserCat.hasMany(models.User,{foreignKey: 'userCatId'})
          }
        }
      }
  );

  return UserCat;
};
