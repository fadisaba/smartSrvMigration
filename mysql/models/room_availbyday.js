"use strict";
module.exports = function(sequelize, DataTypes) {
  let RoomAvailbyday = sequelize.define("RoomAvailbyday", {
          roomAvailbydayId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
          roomAvailbydayDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          roomAvailbydayCode: {
              type: DataTypes.TEXT,
              allowNull: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'room_availbyday',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              RoomAvailbyday.belongsTo(models.Room,{foreignKey: 'roomId'});
              RoomAvailbyday.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );

  return RoomAvailbyday;
};
