"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserFilter = sequelize.define("UserFilter", {
          userFilterId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userFilterName: {
              type: DataTypes.STRING,
              allowNull: false
          },

          userFilterType: {
              type: DataTypes.INTEGER, // 1 : salle d'attente,
              allowNull: false
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_filter',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserFilter.belongsTo(models.User,{foreignKey: 'userId'});
              UserFilter.hasMany(models.UserFilterDetail,{foreignKey: 'userFilterId'});
          }
        }
      }
  );
  return UserFilter;
};
