"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserAvailbyday = sequelize.define("UserAvailbyday", {
          userAvailbydayId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
          roomCatId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userAvailbydayDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          userAvailbydayCode: {
              type: DataTypes.TEXT,
              allowNull: false
          },
          UserAvailbydayIsComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_availbyday',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserAvailbyday.belongsTo(models.User,{foreignKey: 'userId'});
              UserAvailbyday.belongsTo(models.RoomCat,{foreignKey: 'roomCatId'});
              UserAvailbyday.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );
  return UserAvailbyday;
};
