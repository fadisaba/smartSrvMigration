"use strict";
module.exports = function(sequelize, DataTypes) {
  let RoomCat = sequelize.define("RoomCat", {
        roomCatId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        siteId: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        roomCatName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        roomCatCode: {
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
        tableName: 'room_cat',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              RoomCat.hasMany(models.Room,{foreignKey: 'roomCatId'});
              RoomCat.hasMany(models.UserAvailbyday,{foreignKey: 'roomCatId'});
              RoomCat.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );
  return RoomCat;
};
