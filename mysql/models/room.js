"use strict";
module.exports = function(sequelize, DataTypes) {
  let Room = sequelize.define("Room", {
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        siteId: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
          roomCatId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
        roomName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        roomCode: {
              type: DataTypes.STRING,
              allowNull: true
          },
          roomMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          roomPlRdvOrdre: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          roomCoutVacationRemplacant: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          roomPlMedecinOrdre: {
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue:0
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'room',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            Room.hasMany(models.RoomHasDevice,{foreignKey: 'roomId'});
            Room.hasMany(models.GroupRoomHasRoom,{foreignKey: 'roomId'});
            Room.hasMany(models.ResourceSch,{foreignKey: 'roomId'});
            Room.hasMany(models.RoomUnavail,{foreignKey: 'roomId'});
             Room.hasMany(models.SchAvailSlot,{foreignKey: 'roomId'});
             Room.hasMany(models.SchStudySlot,{foreignKey: 'roomId'});
              Room.hasMany(models.RoomAvailbyday,{foreignKey: 'roomId'});
              Room.hasMany(models.RoomSch,{foreignKey: 'roomId'});
            Room.belongsTo(models.Site,{foreignKey: 'siteId'});
              Room.belongsTo(models.RoomCat,{foreignKey: 'roomCatId'});
          }
        }
      }
  );

  return Room;
};
