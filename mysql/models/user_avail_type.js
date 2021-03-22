"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserAvailType = sequelize.define("UserAvailType", {
          userAvailTypeId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          userAvailTypeCode: {
              type: DataTypes.STRING,
              allowNull: false
          },
          userAvailTypeLabel: {
              type: DataTypes.STRING,
              allowNull: false
          },
          userAvailTypePoids: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_avail_type',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserAvailType.hasMany(models.UserAvail,{foreignKey: 'userAvailTypeId',constraints: false});
          }
        }
      }
  );
  return UserAvailType;
};

