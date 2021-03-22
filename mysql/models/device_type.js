"use strict";
module.exports = function(sequelize, DataTypes) {
  var DeviceType = sequelize.define("DeviceType", {
    deviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    deviceTypeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deviceTypeCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
      deviceTypeMigrationId: {
          type: DataTypes.STRING,
          allowNull: true
      },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }

      }, {
        tableName: 'device_type',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            DeviceType.hasMany(models.Device,{foreignKey: 'deviceTypeId'});
          }
        }
      }
  );

  return DeviceType;
};
