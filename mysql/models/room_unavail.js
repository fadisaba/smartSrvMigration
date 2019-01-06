"use strict";
module.exports = function(sequelize, DataTypes) {
  let RoomUnavail = sequelize.define("RoomUnavail", {
          siteUnavailId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
            unavailId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          roomId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
         roomUnavailStartDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
            roomUnavailEndDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
          roomUnavailComment: {
              type: DataTypes.STRING,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'room_unavail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              RoomUnavail.belongsTo(models.Room,{foreignKey: 'roomId'});
              RoomUnavail.belongsTo(models.Unavail,{foreignKey: 'unavailId'});
          }
        }
      }
  );
  return RoomUnavail;
};

