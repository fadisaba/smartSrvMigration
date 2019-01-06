"use strict";
module.exports = function(sequelize, DataTypes) {
  var RoomHasDevice = sequelize.define("RoomHasDevice", {
        roomHasDeviceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        deviceId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'room_has_device',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            RoomHasDevice.belongsTo(models.Device,{foreignKey: 'deviceId'});
            RoomHasDevice.belongsTo(models.Room,{foreignKey: 'roomId'});
          }
        }
      }
  );

  return RoomHasDevice;
};
