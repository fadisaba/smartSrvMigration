"use strict";
module.exports = function(sequelize, DataTypes) {
  let SchedulerPostit = sequelize.define("SchedulerPostit", {
          schedulerPostitId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
        },
          groupRoomId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          schedulerPostitDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          schedulerPostitText: {
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
        tableName: 'scheduler_postit',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              SchedulerPostit.belongsTo(models.GroupRoom,{foreignKey: 'groupRoomId'});
          }
        }
      }
  );
  return SchedulerPostit;
};