"use strict";
module.exports = function(sequelize, DataTypes) {
  let GroupRoomHasRoom = sequelize.define("GroupRoomHasRoom", {
          groupRoomHasRoomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
          groupRoomId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          roomId: {
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
        tableName: 'group_room_has_room',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              GroupRoomHasRoom.belongsTo(models.GroupRoom,{foreignKey: 'groupRoomId'});
              GroupRoomHasRoom.belongsTo(models.Room,{foreignKey: 'roomId'});
          }
        }
      }
  );
  return GroupRoomHasRoom;
};