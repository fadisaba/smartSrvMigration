"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserPreferences = sequelize.define("UserPreferences", {
          userPreferencesId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
         userPreferencesInfo: {
              type: DataTypes.TEXT,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_preferences',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserPreferences.belongsTo(models.User,{foreignKey: 'userId'});
          }
        }
      }
  );
  return UserPreferences;
};

