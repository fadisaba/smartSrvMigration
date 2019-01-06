"use strict";
module.exports = function(sequelize, DataTypes) {
  let GroupRoom = sequelize.define("GroupRoom", {
        groupRoomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
          groupRoomName: {
          type: DataTypes.STRING,
          allowNull: true
        },
          groupRoomCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
          groupRoomSchedulerZoom: { // 5 minutes, 10 minutes,15 minutes, 30 minutes
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue:15
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'group_room',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              GroupRoom.hasMany(models.GroupRoomHasRoom,{foreignKey: 'groupRoomId'});
              GroupRoom.hasMany(models.SchedulerPostit,{foreignKey: 'groupRoomId'});
          }
        }
      }
  );
  return GroupRoom;
};